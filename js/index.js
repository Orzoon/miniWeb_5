window.addEventListener("load", () => {
    //elements
    const main_container = document.querySelector(".main_container");
    const clock_container = document.querySelector(".clock_container");
    const first_container = document.querySelector(".first_con");

    //gsap-utils-main containers 
    const main_con = gsap.utils.selector(main_container);
    const clock_con = gsap.utils.selector(clock_container);
    const first_con = gsap.utils.selector(first_container);
    /* ----COMMON GSAP ANIMATION OBJECTS---- */
    const hw = {
        height: 0,
        width: 0,
        ease: "linear"
    }
    /* Timeline */
    let handRotationReference;
    // init
    init();
    function init(){
        const t_clockAppearance =  innnerClock();
        const t_shadowAppearance = shadowAnim()
        const t_ringAppearance = ringAppearanceAnim()
        const t_legAppearance = legAppearanceAnim();
        // parentTimeline
        const parentTimeline = gsap.timeline({
            repeat: -1,
            yoyo: true,
            repeatDelay: 1.5,
            delay: 0
        })
        parentTimeline.timeScale(1.1)
        parentTimeline
        .add(t_clockAppearance, 0)
        .add("point1", ">-0.3")
        .add(t_shadowAppearance, "<")
        .add(t_ringAppearance,"point1")
        .add(t_legAppearance, "point1")

    }
    /*------FUNCTIONS---------*/
    /***INNTER CIRCLE*****/
    function innnerClock(){
        const opt = {
            ease: "ease-in"
        }
        return t1 = gsap.timeline({})
        // sequence
        .to(".wrapper", {
            height: 156,width: 150,
            duration: 0.8,
            ease: opt.ease
        })
        // first_con
        .to(".first_con", {
            height: 148, width: 148,
            duration: 0.7,
            ease: opt.ease
            // 0.3
        }, "<0.1")
        // second_con
        .to(".second_con", {
            height: 125,width: 125,
            duration: 0.6,
            ease: opt.ease
        }, "<0.1")
        .to(".third_con", {
            height: 115, width: 115,
            duration: 0.5,
            ease: opt.ease
        }, "<0.1")
        .to(".fourth_con", {
            height: 115, width: 115,
            duration: 0.4,
            ease: opt.ease
        }, "<0.1")

        // Inner clock and time as one
        .to(".inner_clock", {
            height: 115, width: 115,
            duration: 0.7,
            ease: "power1.out",
            //background: "green",
        }, "<0.1")
        /* Note InnerClock__base */
        // inner_clock_time_dots
        .to(".time", {
            height: 6, width: 6,
            opacity: 1,
            duration: 0.2,
            ease: "linear"
        }, "<")

        // centerDot
        .to(".centerDot", {
            //...hw,
            height: 13, width: 13, 
            duration: 0.2,
            onComplete: () => {
              if(handRotationReference){
                handRotationReference.progress(0);
                handRotationReference.play()
              }else{
                handRotationReference = handsRotation();
              }
            }
        }, "<")
    }

    function handsRotation(){
        if(handRotationReference) return;
        const opt = {
            ease: "linear",
        }
        return gsap.timeline({})
        // first width
        // secondhand
        .to(clock_con(".hand"), {
            ...opt,
            height: 35,
            duration: 0.3
        })
        .to(clock_con(".secondhand"), {
            ...opt,
            rotate: 360*6,
            duration: 7,
        }, "<0.1")
        // minuteHand
        .to(clock_con(".minutehand"), {
            ...opt,
            rotate: 360*3.1,
            duration: 7,
        }, "<")
        // hourHand
        .to(clock_con(".hourhand"), {
            ...opt,
            rotate: 360*1.2,
            duration: 7,
        }, "<")
    }

    function handsReverse(){
        const opt = {
            ease: "linear",
        }
        return t1 = new gsap.timeline({
            onComplete: () => {
                if(handRotationReference){
                    handRotationReference.reverse();
                }
            }
        })
        // first width
        // secondhand
        .to(clock_con([".hourhand", ".minutehand", ".secondhand"]), {
            ...opt,
            height: 0,
            duration: 0.3
        })
    }

    /***OUTER CIRCLE*****/
    // left and right ring common Funciton
    function ringAppearanceAnim(){
        const opt =  {
            top: 40,
            left: 80,
            ease: "back.out(3)",
            duration: 0.5
        }

        // final
        return gsap.timeline({
                onComplete: () => {
                    shakeRingHead()
                },
                onReverseComplete: () => {
                    handsReverse();
                }
            })
        /** LEFT-RING **/
        .to(".leftRing", {
            display: "block",
            duration: 0.2,
            delay: 0
        })
        .from(".leftRing", {
            ...opt
            // left: 40,
            // top: 0,
            // ease: "back.out(3)",
            // duration: 0.5
        }, "<")

        /** starting of MID-RING animation --at half**/
        /** total --length 0.5 sec */
        .to(".midRing", {
            display: "block",
            delay: 0,
            duration: 0
        }, opt.duration/2)
        .from(".midRing", {
            top: 0,
            duration: 0.2,
            delay: 0,
            ease: opt.ease
        }, "<")
        .to(".mr_top", {
            display: "block",
            delay: 0,
            duration: 0
        }, "<0.1")
        .from(".mr_top", {
            top: 10,
            duration: 0.3,
            ease: "back.out(2.5)"
        }, "<")


        /** RIGHT-RING **/
        .to(".rightRing", {
        display: "block",
        delay: 0,
        duration: 0
        }, opt.duration)
        .from(".rightRing", {
            top: 40,
            right: 80,
            duration: 0.5,
            ease: opt.ease
        }, "<")

        
    }

    function shakeRingHead(){
        const commonOpt = {
            timeScale: 2,
            repeat: 5
        }
        const lShake= gsap.timeline({
            repeat: commonOpt.repeat
        })
        const Rshake = gsap.timeline({
            repeat: commonOpt.repeat
        })

        const MidStop = gsap.timeline({})
        // speeding timescales
        lShake.timeScale(commonOpt.timeScale)
        Rshake.timeScale(commonOpt.timeScale)

        // OPTIONS //
    
        const opt = {
            topPos: 0,
            leftPos:40 
        }
        // step--difference
        let diff = {
            a: 5,
            b: 8
            
        }

        const totalAnimDuration = (((Object.keys(diff).length * 2) * 0.1) * commonOpt.repeat) / commonOpt.timeScale
        
    
        //values alteration between 0-top and 40-left
        lShake
            .to(".leftRing", {
                top: opt.topPos - diff.a,
                left: opt.leftPos - diff.a,
                duration: 0.1
            })
            .to(".leftRing", {
                top: opt.topPos,
                left: opt.leftPos,
                duration: 0.1
            })
            .to(".leftRing", {
                top: opt.topPos - diff.b,
                left: opt.leftPos - diff.b,
                duration: 0.1
            })
            .to(".leftRing", {
                top: opt.topPos,
                left: opt.leftPos,
                duration: 0.1
            })

        Rshake
            .to(".rightRing", {
                top: opt.topPos - diff.a,
                right: opt.leftPos - diff.a,
                duration: 0.1,
                delay: 0.1
            })
            .to(".rightRing", {
                top: opt.topPos,
                right: opt.leftPos,
                duration: 0
            })
            .to(".rightRing", {
                top: opt.topPos - diff.b,
                right: opt.leftPos - diff.b,
                duration: 0.1
            })
            .to(".rightRing", {
                top: opt.topPos,
                right: opt.leftPos,
                duration: 0.1
            })
        
        // mrTop -> -13
        MidStop
            .to(".mr_top", {
                top: -5,
                duration: 0.2,
                delay: totalAnimDuration,
                ease: "ease-in"
            })
            .to(".mr_top", {
                top: -13,
                duration: 0.4,
                delay: 0,
                ease: "ease-out",
            }, ">")
    }

    function legAppearanceAnim(){
        return gsap.timeline({})
        .to(".leg", {
            display: "block",
            delay: 0.3,
            duration: 0
        })
        .from(".leg",{
            height: 0,
            duration: 0.3,
            ease: "back.out(3)",
            
        }, ">")
    }

    function shadowAnim(){
        return gsap.timeline({})
        .to(".shadow", {
            height: 45,
            width: 150,
            duration: 0.8,
            delay: 0,
            ease: "ease-in"
        })
    }
})