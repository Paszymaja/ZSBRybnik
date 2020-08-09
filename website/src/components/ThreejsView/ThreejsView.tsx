import React, {
  FC,
  useEffect,
  useRef,
  MutableRefObject,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import ThreejsViewWrapper from "./ThreejsViewWrapper";
import ThreejsViewLoader from "./ThreejsViewLoader";
import ThreejsViewLoaderLogo from "./ThreejsViewLoaderLogo";
import { useTranslation, UseTranslationResponse } from "react-i18next";

type CreatePointLight = (
  scene: THREE.Scene,
  lightPosition: [number, number, number],
) => void;
type CreateDirectionalLight = (
  scene: THREE.Scene,
  lightPosition: [number, number, number],
) => void;
type CreateAmbientLight = (scene: THREE.Scene) => void;
type ResizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => boolean;
type Animate = () => void;
type IsLoadingDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];

interface ThreejsViewProps {
  modelPath: string;
  zPosition?: number;
  yPosition?: number;
  xPosition?: number;
}

const ThreejsView: FC<ThreejsViewProps> = (
  props: ThreejsViewProps,
): JSX.Element => {
  const logoImage: string = `${process.env.REACT_APP_CDN_URL}/images/logo.webp`;
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isLoading, setIsLoading]: IsLoadingDispatcher = useState(
    true,
  ) as IsLoadingDispatcher;
  const { t }: UseTranslationResponse = useTranslation();
  const el: MutableRefObject<null> = useRef(null);
  const createPointLight: CreatePointLight = (
    scene: THREE.Scene,
    lightPosition: [number, number, number],
  ): void => {
    const light: THREE.PointLight = new THREE.PointLight(0xc4c4c, 10);
    light.position.set(lightPosition[0], lightPosition[1], lightPosition[2]);
    scene.add(light);
  };
  const createDirectionalLight: CreateDirectionalLight = (
    scene: THREE.Scene,
    lightPosition: [number, number, number],
  ): void => {
    const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(
      0xffffff,
      100,
    );
    directionalLight.position.set(
      lightPosition[0],
      lightPosition[1],
      lightPosition[2],
    );
    directionalLight.castShadow = true;
    scene.add(directionalLight);
  };
  const createAmbientLight: CreateAmbientLight = (scene: THREE.Scene): void => {
    const hlight: THREE.AmbientLight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);
  };
  useEffect(
    () => {
      setIsLoading(true);
      const scene: THREE.Scene = new THREE.Scene();
      const background: 2236962 | 15658734 = isDarkTheme ? 0x222222 : 0xeeeeee;
      scene.background = new THREE.Color(background);
      const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
      );
      createAmbientLight(scene);
      const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      createDirectionalLight(scene, [0, 1, 0]);
      createPointLight(scene, [0, 300, 500]);
      createPointLight(scene, [500, 100, 0]);
      createPointLight(scene, [0, 100, -500]);
      createPointLight(scene, [-500, 300, 0]);
      if (props.zPosition) {
        camera.position.z = props.zPosition;
      }
      if (props.yPosition) {
        camera.position.y = props.yPosition;
      }
      if (props.xPosition) {
        camera.position.x = props.xPosition;
      }
      const resizeRendererToDisplaySize: ResizeRendererToDisplaySize = (
        renderer: THREE.WebGLRenderer,
      ): boolean => {
        const canvas: HTMLCanvasElement = renderer.domElement;
        const width: number = canvas.clientWidth;
        const height: number = canvas.clientHeight;
        const needResize: boolean = canvas.width !== width ||
          canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      };
      const htmlEl: HTMLElement = el.current!;
      const loader: GLTFLoader = new GLTFLoader();
      loader.load(props.modelPath, (object3d): void => {
        object3d.scene.scale.set(.5, .5, .5);
        scene.add(object3d.scene);
        setIsLoading(false);
        htmlEl.appendChild(renderer.domElement);
        const animate: Animate = (): void => {
          if (resizeRendererToDisplaySize(renderer)) {
            const canvas: HTMLCanvasElement = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        const controls: OrbitControls = new OrbitControls(
          camera,
          renderer.domElement,
        );
        controls.addEventListener("change", () => {});
        animate();
      });
      return () => {
        const clearDOM = () => {
          try {
            htmlEl.removeChild(renderer.domElement);
          } catch (err) {
            setTimeout(clearDOM, 25);
          }
        };
        clearDOM();
      };
    },
    [
      setIsLoading,
      isDarkTheme,
      props.modelPath,
      props.xPosition,
      props.yPosition,
      props.zPosition,
    ],
  );
  return (
    <div>
      {isLoading
        ? <ThreejsViewLoader>
          <ThreejsViewLoaderLogo
            isDarkTheme={isDarkTheme}
            src={logoImage}
          />
          <br />
          {t("quick-actions.loading")}
        </ThreejsViewLoader>
        : null}
      <ThreejsViewWrapper ref={el} />
    </div>
  );
};

export default ThreejsView;
