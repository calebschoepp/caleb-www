---
title: "Compiling espeak-ng in Xcode for iOS app"
date: 2021-11-12
draft: false
---

Recently at work I've been busy getting neural net text-to-speech to run offline on iOS. One of the steps for this text-to-speech pipeline is turning text into phonemes. At Resemble AI we depend on a library called eSpeak to phonemize the text. The library can be found on Github at [espeak-ng](https://github.com/espeak-ng/espeak-ng). It turned out to be quite an involved process getting eSpeak to compile for an iOS app in Xcode so I wanted to share some tips on how I got it to work.

# Assumptions

This post is just an overview of the issues I ran into while trying to get eSpeak to compile. I won't be walking you through each step and line of code you need to type. I also make a number of assumptions.

1. You already have a stock app setup to work with.
2. We are compiling eSpeak into a stock iOS app, not a framework.
3. The app is written in Swift using Xcode 13.
4. You only need to use the phonemization capabilities of eSpeak. The library can actually do a lot more, but I don't need any of that functionality so I just commented out irrelevant code as necessary.

# Add the code to the project

To start let's add the eSpeak code to the app. Clone the [repository](https://github.com/espeak-ng/espeak-ng) to your machine and then copy the code into your app's folder with Finder. Now in Xcode right click your app's folder (not the project) and select `Add files to "MyApp"`. Go ahead and select the eSpeak folder we moved earlier. Make sure that you deselect `Copy items if needed` and that you select `Create Groups`.

Note that when adding this code it probably all got copied to the bundle. Not sure why this happens. Go to the apps build phases and remove all these files from the bundle.

# Setup a module

Great! Now let's get Xcode to recognize this code as a module it should compile and expose to your other Swift code. Add a `module.modulemap` file to the eSpeak folder with the following contents:

```swift
module EspeakNg [system] {
 header "./src/include/espeak-ng/speak_lib.h"
 header "./src/include/espeak-ng/espeak_ng.h"
 export *
}
```

Now open the app's build settings and add the following import path. Make sure to replace `MyApp` with your app name.

```
${SRCROOT}/MyApp/espeak-ng/**
```

Next in the settings add the following header search path:

```
${SRCROOT}/MyApp/espeak-ng/src/**
```

And the following user header search paths:

# Silencing the errors

Xcode will treat this code as a module now but it is going to fail to compile. Your mileage may very in this section, but here is a number of things I had to do to make this C code happily compile in Xcode.

1. Comment out any references to the `windows.h` header. This is an omnibus header that is only relevant for running eSpeak on a Windows machine. Since you're compiling on a Mac, Xcode won't even know how to find this header.
2. Make sure to comment out any `int main...` declarations within eSpeak. These are just going to conflict with your apps main function.
3. Remove the header shim found at `espeak-ng/src/include/compat/unistd.h`. I found that this shim was giving me errors and wasn't actually providing anything I needed.
4. Comment out the `LoadWaveFile` function. I forgot why it was erroring but it was and I didn't need it for phonemization.

By this point you shouldn't have any more errors. It's possible I've forgotten something though so don't be afraid to dig into the errors and see if you can just get away with removing the offending code.

# Using eSpeak

With all of that out of the way, it is actually pretty straight forward to use eSpeak to phonemize some text.

```swift
import EspeakNg

// Intialize the C library, more on what dataPath is later
espeak_ng_InitializePath(dataPath)
var context: espeak_ng_ERROR_CONTEXT? = nil
let result: espeak_ng_STATUS = espeak_ng_Initialize(&context);
guard result.rawValue == 0 else {
    fatalError("Failed to initialize eSpeak")
}
espeak_SetVoiceByName("en-us")

// Phonemize some text
let options: Int32 = 0 | espeakPHONEMES_IPA
var text = "My text I want to phonemize"
var textPtr: UnsafeRawPointer? = UnsafeRawPointer(text)
let phonemesPtr = espeak_TextToPhonemes(&textPtr, espeakCHARS_UTF8, options)
if let phonemes = phonemesPtr {
  print(String(cString: phonemes))
}
```

# Missing dependencies

I've actually lied to you though — eSpeak won't quite work yet. It turns out that it depends on the data found under `espeak-ng-data/`. This data contains dictionaries and other mappings that are needed for phonemization. When eSpeak is installed as a CLI on a traditional unix system this data is copied to somewhere like `/usr/local` where the CLI can read it. Where do we put this for an iOS app?

The most analogous place to `/usr/local` for an iOS app is the [apps library](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html). This a place in the filesystem specifically for resources an app depends on. Let's copy the data there so that eSpeak can get at it. We will also check to make sure the data has been copied there before we try to phonemize text.

Before we can copy the data to the library it must be in the apps bundle. In the app settings drag the `espeak-ng-data/` folder to the `Copy Bundle Resources` build phase.

Now that we have the data in the app's bundle we can copy it over to the app's library when we run the app. Make sure to only do this if it hasn't been already done.

```swift
// Copy espeak-ng-data from bundle to app library
let library = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask)[0]
let espeakNgData = library.appendingPathComponent("espeak-ng-data")
let fileManager = FileManager.default
// This is the path to the data that we referenced in espeak_ng_InitializePath above
dataPath = String(espeakNgData.absoluteURL.standardizedFileURL.absoluteString.dropFirst((espeakNgData.scheme?.count ?? -3) + 3).dropLast())

// Only copy files if they don't exist
if !fileManager.fileExists(atPath: espeakNgData.path) {
    guard let bundle = Bundle.main.path(forResource: "espeak-ng-data", ofType: "") else {
        fatalError("Failed to find path to espeak-ng-data in app bundle")
    }
    try! fileManager.copyItem(atPath: bundle, toPath: espeakNgData.path)
}
```

# Pregenerated data

Turns out I've lied to you again. Sorry, I promise that was the last time. Remember how eSpeak depends on some data (dictionaries, mappings, etc.) to work? Well this data in `espeak-ng-data/` isn't ready out of the box when you clone the repository. It actually has to be generated by eSpeak itself. This generation process takes the relatively small amount of base data found in `espeak-ng-data/` and generates the full set of data you need.

While you could conceivably generate this data on the fly from within your iOS app using the eSpeak API's I think this is needlessly difficult. I found it easier to pre-generate this data and then directly include that in my bundle.

You could get the pre-generated data in one of two ways. If you have eSpeak installed on your system from a package manager you could go find the data and copy it. It will probably be living somewhere like `/usr/local/espeak-ng-data/`. Alternatively, if you can't install eSpeak through a package manager you could compile it yourself and then go find the data in the same place. This is what I did.

# All done

And with all that you should hopefully have eSpeak running within an iOS app phonemizing text for you. To repeat myself, these are just the Coles Notes for getting this to work so it is totally possible that you'll run into some other errors. If this was helpful to you or you got stuck along the way please reach out to me — I'd love to talk.
