import { Easing, Tween, update } from '@tweenjs/tween.js';
import GUI from 'lil-gui';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

class ThreeJSContainer {
    private scene: THREE.Scene;
    private light: THREE.DirectionalLight;
    private ambientLight: THREE.AmbientLight;
    private tanuki: THREE.Object3D;
    private onigiri: THREE.Object3D;
    private onigiriLoaded: boolean = false;
    private tanukiLoaded: boolean = false;
    private tanukiTween: Tween<THREE.Vector3>;
    private gui: GUI;
    private guiObj: any;

    constructor() { }

    // 画面部分の作成(表示する枠ごとに)
    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x87CEEB)); // 背景色を空の色に設定
        renderer.shadowMap.enabled = true; // シャドウマップを有効にする

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new THREE.Vector3(0, 1, 0)); // カメラがたぬきを中心に見るように設定

        // OrbitControlsの設定
        const orbitControls = new OrbitControls(camera, renderer.domElement);

        // シーンとGUIの初期設定
        this.createScene();
        this.setupGUI();

        // 毎フレームの更新とレンダリング
        const render: FrameRequestCallback = (time) => {
            update(time); // TWEENの更新
            orbitControls.update(); // カメラの制御
            renderer.render(this.scene, camera); // シーンのレンダリング
            requestAnimationFrame(render); // 次のフレームを呼び出す
        }
        requestAnimationFrame(render);

        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    }

    // シーンの作成(全体で1回)
    private createScene = () => {
        this.scene = new THREE.Scene();

        // 環境の追加
        this.addEnvironment();

        // たぬきモデルの読み込み
        this.loadOBJ("tanuki.obj", "tanuki.mtl", new THREE.Vector3(0, 1, 0), new THREE.Vector3(1.5, 1.5, 1.5), (obj) => {
            this.tanuki = obj;
            this.tanukiLoaded = true;
            this.checkAndStartAnimation();
        });

        // おにぎりモデルの読み込み
        this.loadOBJ("onigiri.obj", "onigiri.mtl", new THREE.Vector3(1.5, 0.5, 0.5), new THREE.Vector3(1, 1, 1), (obj) => {
            this.onigiri = obj;
            this.onigiriLoaded = true;
            this.checkAndStartAnimation();
        });

        // ライトの設定
        this.light = new THREE.DirectionalLight(0xffffff);
        const lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x - 7, lvec.y + 13, lvec.z + 7); // ライトの位置を調整
        this.light.castShadow = true;
        this.scene.add(this.light);

        // 環境光の設定
        this.ambientLight = new THREE.AmbientLight(0x404040); // 環境光を追加
        this.scene.add(this.ambientLight);
    }

    // OBJモデルの読み込み
    private loadOBJ = (objFilePath: string, mtlFilePath: string, position: THREE.Vector3, scale: THREE.Vector3, callback: (obj: THREE.Object3D) => void) => {
        const mtlLoader = new MTLLoader();
        mtlLoader.load(mtlFilePath, (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(objFilePath, (obj) => {
                obj.position.copy(position);
                obj.scale.copy(scale); // モデルのスケールを設定
                obj.rotation.y = Math.PI; // モデルの向きを調整
                obj.castShadow = true;
                obj.receiveShadow = true;
                this.scene.add(obj);
                callback(obj);
            });
        });
    }

    // 環境の追加
    private addEnvironment = () => {
        // 地面の追加
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // 地面の色を変更
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // 川の追加
        const riverGeometry = new THREE.PlaneGeometry(20, 5);
        const riverMaterial = new THREE.MeshStandardMaterial({ color: 0x1E90FF });
        const river = new THREE.Mesh(riverGeometry, riverMaterial);
        river.rotation.x = -Math.PI / 2;
        river.position.set(0, 0.01, 10);
        river.receiveShadow = true;
        this.scene.add(river);

        // 木々の追加
        const treePositions = [
            { x: -5, y: 2.5, z: -5 },
            { x: 5, y: 2.5, z: -5 },
            { x: -5, y: 2.5, z: 5 },
            { x: 5, y: 2.5, z: 5 },
        ];

        const treeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5);
        const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const foliageGeometry = new THREE.SphereGeometry(2);

        treePositions.forEach((position, index) => {
            const tree = new THREE.Mesh(treeGeometry, treeMaterial);
            tree.position.set(position.x, position.y, position.z);
            tree.castShadow = true;
            this.scene.add(tree);

            const foliageMaterial = new THREE.MeshStandardMaterial({ color: index % 2 === 0 ? 0x2E8B57 : 0x808000 }); // 交互に色を設定
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
            foliage.position.set(position.x, position.y + 3, position.z);
            foliage.castShadow = true;
            this.scene.add(foliage);

            // 右前の木の左側に穴を追加
            if (index === 3) {
                const holeGeometry = new THREE.CircleGeometry(1.7, 35); // 円の大きさを設定
                const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x734E30 }); // 基本の黒色マテリアル
                const hole = new THREE.Mesh(holeGeometry, holeMaterial);
                hole.position.set(position.x - 3.0, 0.02, position.z); // Y座標を地面に合わせる
                hole.rotation.x = -Math.PI / 2; // 円が地面に対して水平になるように回転
                hole.castShadow = true;
                this.scene.add(hole);
            }
        });
    }

    // アニメーションのチェックと開始
    private checkAndStartAnimation = () => {
        if (this.onigiriLoaded && this.tanukiLoaded) {
            const holePosition = new THREE.Vector3(2, 0, 5); // 穴の位置

            // おにぎりのアニメーション
            const onigiriTween = new Tween(this.onigiri.position)
                .to({ x: holePosition.x, z: holePosition.z }, 5000) // アニメーション時間を5秒に設定
                .easing(Easing.Quadratic.InOut)
                .onUpdate(() => {
                    this.onigiri.rotation.x += 0.05; // 一定の回転速度で回転
                })
                .onComplete(() => {
                    // おにぎりが穴に到達したら下に落ちる
                    new Tween(this.onigiri.position)
                        .to({ y: -2 }, 1000)
                        .easing(Easing.Quadratic.In)
                        .start();
                });

            // たぬきのアニメーション
            this.tanukiTween = new Tween(this.tanuki.position)
                .to({ x: holePosition.x, z: holePosition.z }, 5000) // アニメーション時間を5秒に設定
                .easing(Easing.Quadratic.InOut)
                .delay(3000) // おにぎりが動き始めてから3秒遅れてたぬきが動き出す
                .onUpdate(() => {
                    this.tanuki.position.y = 1; // たぬきの高さを一定に保つ
                })
                .onComplete(() => {
                    // たぬきが穴に到達したら下に落ちる
                    new Tween(this.tanuki.position)
                        .to({ y: -2 }, 1000)
                        .easing(Easing.Quadratic.In)
                        .start();
                });

            onigiriTween.start();
            this.tanukiTween.start();
        }
    }

    // GUIの設定
    private setupGUI = () => {
        this.gui = new GUI();
        this.guiObj = { stopTanuki: () => this.stopTanuki() };
        this.gui.add(this.guiObj, 'stopTanuki').name('たぬきを助ける🍙💨');
    }

    // たぬきを止める関数
    private stopTanuki = () => {
        if (this.tanukiTween) {
            this.tanukiTween.stop();
        }
    }
}

window.addEventListener("DOMContentLoaded", init);

function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(0, 5, 15)); // カメラの位置を調整
    document.body.appendChild(viewport);
}
