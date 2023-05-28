// window.addEventListener("load", function (e) {
//   // const colorScale = d3.scaleSequentialSqrt(d3.interpolateBlues).exponent(0.45);
//   //Here you can change colors of surface
//   const colorScale = d3.scaleSequentialSqrt(["#000", "#00AF77"]).exponent(0.15);
//   /////////////////////////////////////////////////////////
//   const getVal = (feat) =>
//     //Here defines on which property data and colors are build
//     feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
//   //////////////////////////////////////////////////////
//   const container = document.getElementById("__next");
//   const containerWidth = container.offsetWidth;
//   const containerHeight = container.offsetHeight;
//   fetch("countries.geojson")
//     .then((response) => response.json())
//     .then((countries) => {
//       const maxVal = Math.max(...countries.features.map(getVal));
//       colorScale.domain([0, maxVal]);
//       let piedataArray;

//       // const htmlArray = [
//       //   function (lat, lng) {
//       //     let latitude = lat,
//       //       length = lng;
//       //   },
//       // ];

//       //========================================================================================================================================================
//       //========================================================================================================================================================

//       const world = Globe({
//         animateIn: true,
//       })
//         .onGlobeReady(function () {
//           var e = world.controls();
//           (e.autoRotate = 0), (e.autoRotateSpeed = -0.25), (e.enableZoom = !1);
//           //Customize globe size
//           world.pointOfView({ altitude: 1.8 });
//         })
//         .lineHoverPrecision(0)

//         .polygonsData(
//           countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")
//         )

//         .showGlobe(true)
//         .backgroundColor("rgba(0,0,0,0)")
//         //Customize water surface colour (only image is acceptable)
//         .globeImageUrl("media/bg.webp")
//         //         .globeImageUrl("bg-blue.png")
//         .width(containerWidth)
//         .height(containerHeight)
//         .showAtmosphere(true)
//         .atmosphereAltitude(0.1)
//         .atmosphereColor("#56A6E7")

//         .polygonAltitude(0.01)
//         .polygonCapColor((feat) => colorScale(getVal(feat)))
//         //Customize sides of polygon
//         .polygonSideColor(() => "#55A6E7")
//         .polygonStrokeColor(() => "#000")
//         //   .htmlElementsData(htmlArray)
//         //   .htmlLat("latitude")
//         //   .htmlLng("longitude")
//         //   .htmlElement(function () {
//         //     var e =
//         //         '\n            <div class="text-white">\n              <span class="">'.concat(
//         //           '<svg width="100%" height="100%" viewBox="-4 0 36 36" overflow="visible">\n    <path fill="#00AF77" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" stroke="transparent"></path>\n    <circle fill="white" cx="14" cy="14" r="7"></circle>\n  </svg>',
//         //           "</span>\n            </div>\n          "
//         //         ),
//         //       n = document.createElement("div");
//         //     const container = document.querySelector(".scene-container");
//         //     container.appendChild(n);

//         //     return (n.innerHTML = e), n;
//         //   })
//         //   .htmlTransitionDuration(0)

//         .onPolygonHover(function (polygon, prevPolygon) {
//           world.polygonAltitude(newFunction(polygon));

//           function newFunction(polygon) {
//             return (d) => (d === polygon ? 0.03 : 0.01);
//           }
//         })
//         .onPolygonClick(function (polygon, e, coord) {
//           //  const medlng = (polygon.bbox[0] + polygon.bbox[2]) / 2;
//           //  const medlat = (polygon.bbox[1] + polygon.bbox[3]) / 2;

//           //
//           world.polygonAltitude(newFunction(polygon)).polygonCapColor((d) =>
//             //Customize colour on click
//             d === polygon ? "#FF6A10" : colorScale(getVal(d))
//           );
//           const lat = coord.lat,
//             lng = coord.lng;
//           world.pointOfView({ lat, lng, altitude: 1.5 }, 1200);
//           //  world.htmlLat(medlat);
//           //  world.htmlLng(medlng);
//           function newFunction(polygon) {
//             return (d) => (d === polygon ? 0.03 : 0.01);
//           }
//           changeInfo(polygon);

//           //   --------------------------------------
//           const piedata = polygon.piedata;
//           if (piedata && piedata.length) {
//             piedataArray = piedata.map((el) => {
//               const valuekey = el[0];
//               const namekey = el[1];
//               const pieElement = {
//                 value: valuekey,
//                 name: namekey,
//               };

//               return pieElement;
//             });
//             //   Chart
//             var dom = document.getElementById("diagramm");

//             var app = {};

//             var option;

//             option = {
//               tooltip: {
//                 trigger: "item",
//                 valueFormatter: (value) => value + "%",
//                 borderColor: "transparent",
//                 className: "diagramm-tooltip",
//                 padding: 4,
//                 textStyle: {
//                   fontSize: 8,
//                   fontWeight: 700,
//                 },
//               },
//               visualMap: {
//                 show: false,
//                 min: 0,
//                 max: 100,
//                 inRange: {
//                   colorLightness: [0, 1],
//                 },
//               },
//               series: [
//                 {
//                   type: "pie",

//                   center: ["50%", "50%"],
//                   data: piedataArray.sort(function (a, b) {
//                     return a.value - b.value;
//                   }),
//                   roseType: "radius",
//                   label: {
//                     color: "#474E67",
//                     fontSize: 11,
//                     fontSize: 24,
//                     overflow: "break",
//                     lineHeight: 16,
//                   },
//                   labelLine: {
//                     lineStyle: {
//                       color: "rgba(71, 78, 103, 0.2)",
//                     },
//                     smooth: 0.2,
//                     length: 1,
//                     length2: 10,
//                   },
//                   itemStyle: {
//                     color: "#075985",
//                     shadowBlur: 10,
//                     shadowColor: "rgb(7, 89, 133, 0.5)",
//                     shadowOffsetY: 5,
//                   },
//                   animationType: "scale",
//                   animationEasing: "elasticOut",
//                   animationDelay: function (idx) {
//                     return Math.random() * 200;
//                   },
//                 },
//               ],
//               media: [
//                 {
//                   option: {
//                     series: [
//                       {
//                         radius: [0, "90%"],
//                         label: {
//                           fontSize: 11,
//                         },
//                         labelLine: {
//                           length: 0.1,
//                           length2: 10,
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   query: {
//                     minAspectRatio: 1.4,
//                   },
//                   option: {
//                     series: [
//                       {
//                         radius: [0, "75%"],
//                         label: {
//                           fontSize: 11,
//                         },
//                         labelLine: {
//                           length: 10,
//                           length2: 0.1,
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   query: {
//                     maxAspectRatio: 1.35,
//                   },
//                   option: {
//                     series: [
//                       {
//                         radius: [0, "95%"],
//                         label: {
//                           fontSize: 11,
//                         },
//                         labelLine: {
//                           length: 10,
//                           length2: 0.1,
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   query: {
//                     maxWidth: 360,
//                   },
//                   option: {
//                     series: [
//                       {
//                         radius: [0, "65%"],
//                         label: {
//                           fontSize: 9,
//                         },
//                         labelLine: {
//                           length: 10,
//                           length2: 0.1,
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             };
//             var myChart = echarts.init(dom, null, {
//               renderer: "canvas",
//               useDirtyRect: false,
//             });
//             if (option && typeof option === "object") {
//               myChart.setOption(option);
//             }
//             window.addEventListener("resize", myChart.resize);
//           }

//           //========================================================================================================================================================

//           //   ===================================
//         })

//         .polygonsTransitionDuration(300)(document.getElementById("__next"));

//       function changeInfo(country) {
//         const countryName = country.properties.ADMIN;
//         const countryBlock = document.querySelector(".main-info__country");
//         countryBlock.innerHTML = countryName;
//       }
//     });
// });

window.onload = function (e) {
  // const colorScale = d3.scaleSequentialSqrt(d3.interpolateBlues).exponent(0.45);
  //Here you can change colors of surface
  const colorScale = d3.scaleSequentialSqrt(["#000", "#00AF77"]).exponent(0.15);
  /////////////////////////////////////////////////////////
  const getVal = (feat) =>
    //Here defines on which property data and colors are build
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  //////////////////////////////////////////////////////
  const container = document.getElementById("__next");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  fetch("countries.geojson")
    .then((response) => response.json())
    .then((countries) => {
      const maxVal = Math.max(...countries.features.map(getVal));
      colorScale.domain([0, maxVal]);
      let piedataArray;

      // const htmlArray = [
      //   function (lat, lng) {
      //     let latitude = lat,
      //       length = lng;
      //   },
      // ];

      //========================================================================================================================================================
      //========================================================================================================================================================

      const world = Globe({
        animateIn: true,
      })
        .onGlobeReady(function () {
          var e = world.controls();
          (e.autoRotate = 0), (e.autoRotateSpeed = -0.25), (e.enableZoom = !1);
          //Customize globe size
          world.pointOfView({ altitude: 1.8 });
        })
        .lineHoverPrecision(0)

        .polygonsData(
          countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")
        )

        .showGlobe(true)
        .backgroundColor("rgba(0,0,0,0)")
        //Customize water surface colour (only image is acceptable)
        .globeImageUrl("media/bg.webp")
        //         .globeImageUrl("bg-blue.png")
        .width(containerWidth)
        .height(containerHeight)
        .showAtmosphere(true)
        .atmosphereAltitude(0.1)
        .atmosphereColor("#56A6E7")

        .polygonAltitude(0.01)
        .polygonCapColor((feat) => colorScale(getVal(feat)))
        //Customize sides of polygon
        .polygonSideColor(() => "#55A6E7")
        .polygonStrokeColor(() => "#000")
        //   .htmlElementsData(htmlArray)
        //   .htmlLat("latitude")
        //   .htmlLng("longitude")
        //   .htmlElement(function () {
        //     var e =
        //         '\n            <div class="text-white">\n              <span class="">'.concat(
        //           '<svg width="100%" height="100%" viewBox="-4 0 36 36" overflow="visible">\n    <path fill="#00AF77" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" stroke="transparent"></path>\n    <circle fill="white" cx="14" cy="14" r="7"></circle>\n  </svg>',
        //           "</span>\n            </div>\n          "
        //         ),
        //       n = document.createElement("div");
        //     const container = document.querySelector(".scene-container");
        //     container.appendChild(n);

        //     return (n.innerHTML = e), n;
        //   })
        //   .htmlTransitionDuration(0)

        .onPolygonHover(function (polygon, prevPolygon) {
          world.polygonAltitude(newFunction(polygon));

          function newFunction(polygon) {
            return (d) => (d === polygon ? 0.03 : 0.01);
          }
        })
        .onPolygonClick(function (polygon, e, coord) {
          //  const medlng = (polygon.bbox[0] + polygon.bbox[2]) / 2;
          //  const medlat = (polygon.bbox[1] + polygon.bbox[3]) / 2;

          //
          world.polygonAltitude(newFunction(polygon)).polygonCapColor((d) =>
            //Customize colour on click
            d === polygon ? "#FF6A10" : colorScale(getVal(d))
          );
          const lat = coord.lat,
            lng = coord.lng;
          world.pointOfView({ lat, lng, altitude: 1.5 }, 1200);
          //  world.htmlLat(medlat);
          //  world.htmlLng(medlng);
          function newFunction(polygon) {
            return (d) => (d === polygon ? 0.03 : 0.01);
          }
          changeInfo(polygon);

          //   --------------------------------------
          const piedata = polygon.piedata;
          if (piedata && piedata.length) {
            piedataArray = piedata.map((el) => {
              const valuekey = el[0];
              const namekey = el[1];
              const pieElement = {
                value: valuekey,
                name: namekey,
              };

              return pieElement;
            });
            //   Chart
            var dom = document.getElementById("diagramm");

            var app = {};

            var option;

            option = {
              tooltip: {
                trigger: "item",
                valueFormatter: (value) => value + "%",
                borderColor: "transparent",
                className: "diagramm-tooltip",
                padding: 4,
                textStyle: {
                  fontSize: 8,
                  fontWeight: 700,
                },
              },
              visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                  colorLightness: [0, 1],
                },
              },
              series: [
                {
                  type: "pie",

                  center: ["50%", "50%"],
                  data: piedataArray.sort(function (a, b) {
                    return a.value - b.value;
                  }),
                  roseType: "radius",
                  label: {
                    color: "#474E67",
                    fontSize: 11,
                    fontSize: 24,
                    overflow: "break",
                    lineHeight: 16,
                  },
                  labelLine: {
                    lineStyle: {
                      color: "rgba(71, 78, 103, 0.2)",
                    },
                    smooth: 0.2,
                    length: 1,
                    length2: 10,
                  },
                  itemStyle: {
                    color: "#075985",
                    shadowBlur: 10,
                    shadowColor: "rgb(7, 89, 133, 0.5)",
                    shadowOffsetY: 5,
                  },
                  animationType: "scale",
                  animationEasing: "elasticOut",
                  animationDelay: function (idx) {
                    return Math.random() * 200;
                  },
                },
              ],
              media: [
                {
                  option: {
                    series: [
                      {
                        radius: [0, "90%"],
                        label: {
                          fontSize: 11,
                        },
                        labelLine: {
                          length: 0.1,
                          length2: 10,
                        },
                      },
                    ],
                  },
                },
                {
                  query: {
                    minAspectRatio: 1.4,
                  },
                  option: {
                    series: [
                      {
                        radius: [0, "75%"],
                        label: {
                          fontSize: 11,
                        },
                        labelLine: {
                          length: 10,
                          length2: 0.1,
                        },
                      },
                    ],
                  },
                },
                {
                  query: {
                    maxAspectRatio: 1.35,
                  },
                  option: {
                    series: [
                      {
                        radius: [0, "95%"],
                        label: {
                          fontSize: 11,
                        },
                        labelLine: {
                          length: 10,
                          length2: 0.1,
                        },
                      },
                    ],
                  },
                },
                {
                  query: {
                    maxWidth: 360,
                  },
                  option: {
                    series: [
                      {
                        radius: [0, "65%"],
                        label: {
                          fontSize: 9,
                        },
                        labelLine: {
                          length: 10,
                          length2: 0.1,
                        },
                      },
                    ],
                  },
                },
              ],
            };
            var myChart = echarts.init(dom, null, {
              renderer: "canvas",
              useDirtyRect: false,
            });
            if (option && typeof option === "object") {
              myChart.setOption(option);
            }
            window.addEventListener("resize", myChart.resize);
          }

          //========================================================================================================================================================

          //   ===================================
        })

        .polygonsTransitionDuration(300)(document.getElementById("__next"));

      function changeInfo(country) {
        const countryName = country.properties.ADMIN;
        const countryBlock = document.querySelector(".main-info__country");
        countryBlock.innerHTML = countryName;
      }
    });
};
