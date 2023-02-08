import { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as BABYLON from '@babylonjs/core';
import { render } from 'react-dom';
import { useRef } from 'react';
import 'babylonjs-loaders';
import { SceneLoader } from '@babylonjs/core/Loading';
import '@babylonjs/loaders';

const objToBabyon = async (canvasId: string, file: string) => {
  let renderCanvas;
  if (typeof document !== 'undefined') {
    renderCanvas = document.getElementById(
      canvasId
    ) as HTMLCanvasElement | null;
  }
  if (!renderCanvas) {
    console.log('cant render canvas');
  }
  if (renderCanvas) {
    console.log('render canvas');
    const engine = new BABYLON.Engine(renderCanvas, true);
    const scene = new BABYLON.Scene(engine);

    scene.createDefaultCameraOrLight(true, true, true);
    scene.createDefaultEnvironment();
    var ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 1, height: 1 },
      scene
    );

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    const resultPromise = BABYLON.SceneLoader.Append('', 'data:' + file, scene);

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};

const Upload = () => {
  const elementId = 'renderCanvasIdTest';

  const onDrop = useCallback((acceptedFiles:any) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => console.log('file reading...');
    reader.onloadend = () => {
      if (reader) {
        //const result = ObjectParser(reader.result);
        const res: string | null | ArrayBuffer = reader.result;
        if (typeof res === 'string') {
          alert('render following file' + res);

          objToBabyon(elementId, res);
        }
      }
    };

    // read file contents
    acceptedFiles.forEach((file: Blob) => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, open } =
    useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag and Drop, or Click here and choose file(※gltf only for now)
          </p>
        )}
      </div>
      <canvas id={elementId} ref={useRef(null)}></canvas>
    </>
  );
};

export default Upload;
