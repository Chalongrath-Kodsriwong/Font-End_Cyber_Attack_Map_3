import $ from 'jquery';

let isHiddens = true; // Tracks visibility of tableContainer
let isAnimatings = false; // Prevents repeated animations during a single click

function getResponsiveMarginTopOFDataAttack() {
  if (window.innerWidth >= 1920) {
    return "280px"; // สำหรับหน้าจอ 1920px
  } else if (window.innerWidth >= 1440) {
    return "250px"; // สำหรับหน้าจอ 1440px
  } else {
    return "230px"; // ค่ามาตรฐานสำหรับหน้าจออื่นๆ
  }
}

export const setupDataAttackerAnimation = () => {
  $(".DataAttacker_log").css({
    "z-index": "999",
    
  })
  $(".DataAttacker_log").click(function () {
    if (isAnimatings) return; // Prevent additional clicks during animation
    isAnimatings = true;

    const marginTopValue2 = getResponsiveMarginTopOFDataAttack(); // ค่าที่ปรับตามขนาดหน้าจอ

    if (isHiddens) {
      // Hide tableContainer and move DataAttacker_log down
      $(".tableContainer").animate(
        {
          marginBottom: "-100px",
          opacity: 0,
        },
        100, // Duration of 500ms
        () => {
          isAnimatings = false; // Allow new animation after completion
        }
      );
      $(".DataAttacker_log").animate(
        {
          marginTop: "0px",
        },
        100
      );
      $(".DataAttacker_log").css({
        "z-index": "999"
      })
      $(".bottom_right").animate(
        {
          marginTop: marginTopValue2,
        },
        100
      );
      $(".Arrow2").css({
        transform: "rotate(-180deg)",
      });
    } else {
      // Show tableContainer and move DataAttacker_log up
      $(".tableContainer").animate(
        {
          marginBottom: "0px",
          opacity: 1,
        },
        10, // Duration of 500ms
        () => {
          isAnimatings = false; // Allow new animation after completion
        }
      );
      $(".DataAttacker_log").animate(
        {
          marginTop: "0px",
        },
        100
      );
      $(".bottom_right").animate(
        {
          marginTop: "0px",
        },
        100
      );
      // Change Arrow rotation for visible state
      $(".Arrow2").css({
        transform: "rotate(0deg)",
      });
    }

    isHiddens = !isHiddens; // Toggle visibility state
  });
  $(".DataAttacker_log").mouseenter(function () {
    $(".Arrow2").css({
      color: "#00bcd4", // Optional: Change color on hover
    });
  });

  $(".DataAttacker_log").mouseleave(function () {
    $(".Arrow2").css({
      color: "", // Reset color on mouse leave
    });
  });
};
