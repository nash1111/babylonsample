import * as BABYLON from "@babylonjs/core";
import { render } from "react-dom";
import { useRef } from "react";
import "babylonjs-loaders";

const objToBabyon = async (canvasId: string) => {
  const renderCanvas = document.getElementById(
    canvasId
  ) as HTMLCanvasElement | null;
  if (!renderCanvas) {
    console.log("cant render canvas");
  }
  if (renderCanvas) {
    console.log("render canvas");
    const engine = new BABYLON.Engine(renderCanvas, true);
    const scene = new BABYLON.Scene(engine);

    scene.createDefaultCameraOrLight(true, true, true);
    scene.createDefaultEnvironment();

    var sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene
    );

    sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, options, scene
    var ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 5, height: 10 },
      scene
    );

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};

export default function ObjBabylon() {
  const elementId = "renderCanvasObj";
  objToBabyon(elementId);
  return (
    <>
      <canvas id={elementId} ref={useRef(null)}></canvas>
    </>
  );
}