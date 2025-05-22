import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function Gsap(pointer,animateElement,MainContent,About,left3D,right3D,Object) {
    let container = gsap.timeline({
          scrollTrigger: {
            trigger: pointer,
            start: "top top",
            end: "+=200%",
            // markers: true,
            scrub: 1,
            pin: true,
          },
         
        });
        container.add([
            gsap.to(animateElement, {
                width: "100vw",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "power2.out",
              }),
              gsap.to(MainContent, {
                opacity:0,
                display:"none",
                duration: 1,
                ease: "power2.out",
            })
        ])
        container.to(About, {
          opacity:1,
          ease: "power2.out",
      });
        container.to(Object, {
            duration:1.5,
            display:"block",
            ease: "power2.out",
        });
        let MoveObject=(model)=>{
          container.to(model.rotation, { y: "+=" + Math.PI * 2, duration: 5, repeat: -1 })
        }
        container.add([
          gsap.to(left3D, {
            duration: 2,
            scrollLeft:350,
            ease: "power2",
        }),  gsap.to(right3D, {
          scrollLeft:350,
          duration: 2,
          ease: "power2",
      })
        ]);
        return {container:container,MoveObject:MoveObject};
}
export function ForSearch(pointer,left_Div,right_Div){
  let container = gsap.timeline({
    scrollTrigger: {
      trigger: pointer,
      start: "center center",
      end: "bottom center",
      // markers: true,
      scrub: 1,
      pin: true,
    },
   
  });
  container.add([
    gsap.to(left_Div,{
      x:180,
      duration:1
    }),
    gsap.to(right_Div,{
      x:-180,
      duration:1
    })
  ])
return container;
}
export default Gsap;