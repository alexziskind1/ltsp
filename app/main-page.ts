import { EventData, Page, Color } from "@nativescript/core";

import { LottieView } from "nativescript-lottie";

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
}

let lottie: LottieView = undefined;
const animationStartFrame = 1;
const animationLoadingLoopPointFrame = 119;
const animationSuccessStartFrame = 238;
const animationSuccessEndFrame = 417;
const animationTotalFrames = 841;
let conclude = false;
let success = false;

export function lottieLoaded(args: EventData) {
    debugger;
    lottie = (args.object as unknown) as LottieView;

    lottie.setColorValueDelegateForKeyPath(new Color("red"), [
        "icn-loader.circle-blue.Group 1.Stroke 1",
    ]);
    lottie.setColorValueDelegateForKeyPath(new Color("green"), [
        "icn-success.circle-blue.Group 1.Stroke 1",
    ]);
    lottie.setColorValueDelegateForKeyPath(new Color("green"), [
        "icn-success.tick.Group 1.Stroke 1",
    ]);

    const boo = lottie.nativeView.logHierarchyKeypaths();
    console.log(boo);

    lottie.completionBlock = (done: boolean) => {
        if (done) {
            alert(success ? "success" : "failure");
            conclude = false;
        }
    };
}

export function onTap() {
    let progress = 0;

    const intervalId = setInterval(() => {
        // console.log(lottie.progress); // doesn't work
        // lottie.nativeView.realtimeAnimationProgress ?
        // lottie.nativeView.currentFrame ?
        progress = progress < animationLoadingLoopPointFrame ? progress + 1 : 0;
        console.log(progress);

        if (progress === 0 && conclude) {
            clearInterval(intervalId);
            concludeAnimation();
        }
    }, 1000 / 60);

    startAnimationLoop();
}

export function onTapSuccess() {
    conclude = true;
    success = true;
}

export function onTapFailure() {
    conclude = true;
    success = false;
}

function startAnimationLoop() {
    lottie.playAnimationFromProgressToProgress(
        0,
        animationLoadingLoopPointFrame / animationTotalFrames
    );
    lottie.loop = true;
}

function concludeAnimation() {
    lottie.loop = false;
    let from = animationSuccessStartFrame / animationTotalFrames;
    let to = animationSuccessEndFrame / animationTotalFrames;

    if (!success) {
        from = 705 / animationTotalFrames;
        to = 1;
    }

    lottie.playAnimationFromProgressToProgress(from, to);
}
