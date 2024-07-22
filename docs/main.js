/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");






class ThreeJSContainer {
    scene;
    light;
    ambientLight;
    tanuki;
    onigiri;
    onigiriLoaded = false;
    tanukiLoaded = false;
    tanukiTween;
    gui;
    guiObj;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x87CEEB)); // 背景色を空の色に設定
        renderer.shadowMap.enabled = true; // シャドウマップを有効にする
        // カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_4__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 1, 0)); // カメラがたぬきを中心に見るように設定
        // OrbitControlsの設定
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement);
        // シーンとGUIの初期設定
        this.createScene();
        this.setupGUI();
        // 毎フレームの更新とレンダリング
        const render = (time) => {
            (0,_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update)(time); // TWEENの更新
            orbitControls.update(); // カメラの制御
            renderer.render(this.scene, camera); // シーンのレンダリング
            requestAnimationFrame(render); // 次のフレームを呼び出す
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_4__.Scene();
        // 環境の追加
        this.addEnvironment();
        // たぬきモデルの読み込み
        this.loadOBJ("tanuki.obj", "tanuki.mtl", new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 1, 0), new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1.5, 1.5, 1.5), (obj) => {
            this.tanuki = obj;
            this.tanukiLoaded = true;
            this.checkAndStartAnimation();
        });
        // おにぎりモデルの読み込み
        this.loadOBJ("onigiri.obj", "onigiri.mtl", new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1.5, 0.5, 0.5), new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 1, 1), (obj) => {
            this.onigiri = obj;
            this.onigiriLoaded = true;
            this.checkAndStartAnimation();
        });
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x - 7, lvec.y + 13, lvec.z + 7); // ライトの位置を調整
        this.light.castShadow = true;
        this.scene.add(this.light);
        // 環境光の設定
        this.ambientLight = new three__WEBPACK_IMPORTED_MODULE_4__.AmbientLight(0x404040); // 環境光を追加
        this.scene.add(this.ambientLight);
    };
    // OBJモデルの読み込み
    loadOBJ = (objFilePath, mtlFilePath, position, scale, callback) => {
        const mtlLoader = new three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_2__.MTLLoader();
        mtlLoader.load(mtlFilePath, (materials) => {
            materials.preload();
            const objLoader = new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_3__.OBJLoader();
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
    };
    // 環境の追加
    addEnvironment = () => {
        // 地面の追加
        const groundGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.PlaneGeometry(100, 100);
        const groundMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({ color: 0x228B22 }); // 地面の色を変更
        const ground = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        // 川の追加
        const riverGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.PlaneGeometry(20, 5);
        const riverMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({ color: 0x1E90FF });
        const river = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(riverGeometry, riverMaterial);
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
        const treeGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.CylinderGeometry(0.5, 0.5, 5);
        const treeMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({ color: 0x8B4513 });
        const foliageGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.SphereGeometry(2);
        treePositions.forEach((position, index) => {
            const tree = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(treeGeometry, treeMaterial);
            tree.position.set(position.x, position.y, position.z);
            tree.castShadow = true;
            this.scene.add(tree);
            const foliageMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({ color: index % 2 === 0 ? 0x2E8B57 : 0x808000 }); // 交互に色を設定
            const foliage = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(foliageGeometry, foliageMaterial);
            foliage.position.set(position.x, position.y + 3, position.z);
            foliage.castShadow = true;
            this.scene.add(foliage);
            // 右前の木の左側に穴を追加
            if (index === 3) {
                const holeGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.CircleGeometry(1.7, 35); // 円の大きさを設定
                const holeMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshBasicMaterial({ color: 0x734E30 }); // 基本の黒色マテリアル
                const hole = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(holeGeometry, holeMaterial);
                hole.position.set(position.x - 3.0, 0.02, position.z); // Y座標を地面に合わせる
                hole.rotation.x = -Math.PI / 2; // 円が地面に対して水平になるように回転
                hole.castShadow = true;
                this.scene.add(hole);
            }
        });
    };
    // アニメーションのチェックと開始
    checkAndStartAnimation = () => {
        if (this.onigiriLoaded && this.tanukiLoaded) {
            const holePosition = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(2, 0, 5); // 穴の位置
            // おにぎりのアニメーション
            const onigiriTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(this.onigiri.position)
                .to({ x: holePosition.x, z: holePosition.z }, 5000) // アニメーション時間を5秒に設定
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.InOut)
                .onUpdate(() => {
                this.onigiri.rotation.x += 0.05; // 一定の回転速度で回転
            })
                .onComplete(() => {
                // おにぎりが穴に到達したら下に落ちる
                new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(this.onigiri.position)
                    .to({ y: -2 }, 1000)
                    .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.In)
                    .start();
            });
            // たぬきのアニメーション
            this.tanukiTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(this.tanuki.position)
                .to({ x: holePosition.x, z: holePosition.z }, 5000) // アニメーション時間を5秒に設定
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.InOut)
                .delay(3000) // おにぎりが動き始めてから3秒遅れてたぬきが動き出す
                .onUpdate(() => {
                this.tanuki.position.y = 1; // たぬきの高さを一定に保つ
            })
                .onComplete(() => {
                // たぬきが穴に到達したら下に落ちる
                new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(this.tanuki.position)
                    .to({ y: -2 }, 1000)
                    .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.In)
                    .start();
            });
            onigiriTween.start();
            this.tanukiTween.start();
        }
    };
    // GUIの設定
    setupGUI = () => {
        this.gui = new lil_gui__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.guiObj = { stopTanuki: () => this.stopTanuki() };
        this.gui.add(this.guiObj, 'stopTanuki').name('たぬきを助ける🍙💨');
    };
    // たぬきを止める関数
    stopTanuki = () => {
        if (this.tanukiTween) {
            this.tanukiTween.stop();
        }
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 5, 15)); // カメラの位置を調整
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_lil-gui_dist_lil-gui_esm-0e5649"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Iiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVhc2luZywgVHdlZW4sIHVwZGF0ZSB9IGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCB7IE1UTExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL01UTExvYWRlci5qcyc7XG5pbXBvcnQgeyBPQkpMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9PQkpMb2FkZXIuanMnO1xuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0O1xuICAgIHByaXZhdGUgYW1iaWVudExpZ2h0OiBUSFJFRS5BbWJpZW50TGlnaHQ7XG4gICAgcHJpdmF0ZSB0YW51a2k6IFRIUkVFLk9iamVjdDNEO1xuICAgIHByaXZhdGUgb25pZ2lyaTogVEhSRUUuT2JqZWN0M0Q7XG4gICAgcHJpdmF0ZSBvbmlnaXJpTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0YW51a2lMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRhbnVraVR3ZWVuOiBUd2VlbjxUSFJFRS5WZWN0b3IzPjtcbiAgICBwcml2YXRlIGd1aTogR1VJO1xuICAgIHByaXZhdGUgZ3VpT2JqOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqylcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4ODdDRUVCKSk7IC8vIOiDjOaZr+iJsuOCkuepuuOBruiJsuOBq+ioreWumlxuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8vIOOCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8vIOOCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApKTsgLy8g44Kr44Oh44Op44GM44Gf44Gs44GN44KS5Lit5b+D44Gr6KaL44KL44KI44GG44Gr6Kit5a6aXG5cbiAgICAgICAgLy8gT3JiaXRDb250cm9sc+OBruioreWumlxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICAvLyDjgrfjg7zjg7PjgahHVUnjga7liJ3mnJ/oqK3lrppcbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuICAgICAgICB0aGlzLnNldHVwR1VJKCk7XG5cbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44Gu5pu05paw44Go44Os44Oz44OA44Oq44Oz44KwXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlKHRpbWUpOyAvLyBUV0VFTuOBruabtOaWsFxuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTsgLy8g44Kr44Oh44Op44Gu5Yi25b6hXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTsgLy8g44K344O844Oz44Gu44Os44Oz44OA44Oq44Oz44KwXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTsgLy8g5qyh44Gu44OV44Os44O844Og44KS5ZG844Gz5Ye644GZXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyDjgrfjg7zjg7Pjga7kvZzmiJAo5YWo5L2T44GnMeWbnilcbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgLy8g55Kw5aKD44Gu6L+95YqgXG4gICAgICAgIHRoaXMuYWRkRW52aXJvbm1lbnQoKTtcblxuICAgICAgICAvLyDjgZ/jgazjgY3jg6Ljg4fjg6vjga7oqq3jgb/ovrzjgb9cbiAgICAgICAgdGhpcy5sb2FkT0JKKFwidGFudWtpLm9ialwiLCBcInRhbnVraS5tdGxcIiwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIG5ldyBUSFJFRS5WZWN0b3IzKDEuNSwgMS41LCAxLjUpLCAob2JqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhbnVraSA9IG9iajtcbiAgICAgICAgICAgIHRoaXMudGFudWtpTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tBbmRTdGFydEFuaW1hdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDjgYrjgavjgY7jgorjg6Ljg4fjg6vjga7oqq3jgb/ovrzjgb9cbiAgICAgICAgdGhpcy5sb2FkT0JKKFwib25pZ2lyaS5vYmpcIiwgXCJvbmlnaXJpLm10bFwiLCBuZXcgVEhSRUUuVmVjdG9yMygxLjUsIDAuNSwgMC41KSwgbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSksIChvYmopID0+IHtcbiAgICAgICAgICAgIHRoaXMub25pZ2lyaSA9IG9iajtcbiAgICAgICAgICAgIHRoaXMub25pZ2lyaUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQW5kU3RhcnRBbmltYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54IC0gNywgbHZlYy55ICsgMTMsIGx2ZWMueiArIDcpOyAvLyDjg6njgqTjg4jjga7kvY3nva7jgpLoqr/mlbRcbiAgICAgICAgdGhpcy5saWdodC5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG5cbiAgICAgICAgLy8g55Kw5aKD5YWJ44Gu6Kit5a6aXG4gICAgICAgIHRoaXMuYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDQwNDA0MCk7IC8vIOeSsOWig+WFieOCkui/veWKoFxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnRMaWdodCk7XG4gICAgfVxuXG4gICAgLy8gT0JK44Oi44OH44Or44Gu6Kqt44G/6L6844G/XG4gICAgcHJpdmF0ZSBsb2FkT0JKID0gKG9iakZpbGVQYXRoOiBzdHJpbmcsIG10bEZpbGVQYXRoOiBzdHJpbmcsIHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLCBzY2FsZTogVEhSRUUuVmVjdG9yMywgY2FsbGJhY2s6IChvYmo6IFRIUkVFLk9iamVjdDNEKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGNvbnN0IG10bExvYWRlciA9IG5ldyBNVExMb2FkZXIoKTtcbiAgICAgICAgbXRsTG9hZGVyLmxvYWQobXRsRmlsZVBhdGgsIChtYXRlcmlhbHMpID0+IHtcbiAgICAgICAgICAgIG1hdGVyaWFscy5wcmVsb2FkKCk7XG4gICAgICAgICAgICBjb25zdCBvYmpMb2FkZXIgPSBuZXcgT0JKTG9hZGVyKCk7XG4gICAgICAgICAgICBvYmpMb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFscyk7XG4gICAgICAgICAgICBvYmpMb2FkZXIubG9hZChvYmpGaWxlUGF0aCwgKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIG9iai5wb3NpdGlvbi5jb3B5KHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBvYmouc2NhbGUuY29weShzY2FsZSk7IC8vIOODouODh+ODq+OBruOCueOCseODvOODq+OCkuioreWumlxuICAgICAgICAgICAgICAgIG9iai5yb3RhdGlvbi55ID0gTWF0aC5QSTsgLy8g44Oi44OH44Or44Gu5ZCR44GN44KS6Kq/5pW0XG4gICAgICAgICAgICAgICAgb2JqLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9iai5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChvYmopO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG9iaik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8g55Kw5aKD44Gu6L+95YqgXG4gICAgcHJpdmF0ZSBhZGRFbnZpcm9ubWVudCA9ICgpID0+IHtcbiAgICAgICAgLy8g5Zyw6Z2i44Gu6L+95YqgXG4gICAgICAgIGNvbnN0IGdyb3VuZEdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAwLCAxMDApO1xuICAgICAgICBjb25zdCBncm91bmRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweDIyOEIyMiB9KTsgLy8g5Zyw6Z2i44Gu6Imy44KS5aSJ5pu0XG4gICAgICAgIGNvbnN0IGdyb3VuZCA9IG5ldyBUSFJFRS5NZXNoKGdyb3VuZEdlb21ldHJ5LCBncm91bmRNYXRlcmlhbCk7XG4gICAgICAgIGdyb3VuZC5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgICAgICBncm91bmQucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGdyb3VuZCk7XG5cbiAgICAgICAgLy8g5bed44Gu6L+95YqgXG4gICAgICAgIGNvbnN0IHJpdmVyR2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgyMCwgNSk7XG4gICAgICAgIGNvbnN0IHJpdmVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHgxRTkwRkYgfSk7XG4gICAgICAgIGNvbnN0IHJpdmVyID0gbmV3IFRIUkVFLk1lc2gocml2ZXJHZW9tZXRyeSwgcml2ZXJNYXRlcmlhbCk7XG4gICAgICAgIHJpdmVyLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgICAgIHJpdmVyLnBvc2l0aW9uLnNldCgwLCAwLjAxLCAxMCk7XG4gICAgICAgIHJpdmVyLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChyaXZlcik7XG5cbiAgICAgICAgLy8g5pyo44CF44Gu6L+95YqgXG4gICAgICAgIGNvbnN0IHRyZWVQb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICB7IHg6IC01LCB5OiAyLjUsIHo6IC01IH0sXG4gICAgICAgICAgICB7IHg6IDUsIHk6IDIuNSwgejogLTUgfSxcbiAgICAgICAgICAgIHsgeDogLTUsIHk6IDIuNSwgejogNSB9LFxuICAgICAgICAgICAgeyB4OiA1LCB5OiAyLjUsIHo6IDUgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCB0cmVlR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjUsIDAuNSwgNSk7XG4gICAgICAgIGNvbnN0IHRyZWVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweDhCNDUxMyB9KTtcbiAgICAgICAgY29uc3QgZm9saWFnZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDIpO1xuXG4gICAgICAgIHRyZWVQb3NpdGlvbnMuZm9yRWFjaCgocG9zaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmVlID0gbmV3IFRIUkVFLk1lc2godHJlZUdlb21ldHJ5LCB0cmVlTWF0ZXJpYWwpO1xuICAgICAgICAgICAgdHJlZS5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICAgICAgICB0cmVlLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodHJlZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvbGlhZ2VNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAweDJFOEI1NyA6IDB4ODA4MDAwIH0pOyAvLyDkuqTkupLjgavoibLjgpLoqK3lrppcbiAgICAgICAgICAgIGNvbnN0IGZvbGlhZ2UgPSBuZXcgVEhSRUUuTWVzaChmb2xpYWdlR2VvbWV0cnksIGZvbGlhZ2VNYXRlcmlhbCk7XG4gICAgICAgICAgICBmb2xpYWdlLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55ICsgMywgcG9zaXRpb24ueik7XG4gICAgICAgICAgICBmb2xpYWdlLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoZm9saWFnZSk7XG5cbiAgICAgICAgICAgIC8vIOWPs+WJjeOBruacqOOBruW3puWBtOOBq+eptOOCkui/veWKoFxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaG9sZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDEuNywgMzUpOyAvLyDlhobjga7lpKfjgY3jgZXjgpLoqK3lrppcbiAgICAgICAgICAgICAgICBjb25zdCBob2xlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHg3MzRFMzAgfSk7IC8vIOWfuuacrOOBrum7kuiJsuODnuODhuODquOCouODq1xuICAgICAgICAgICAgICAgIGNvbnN0IGhvbGUgPSBuZXcgVEhSRUUuTWVzaChob2xlR2VvbWV0cnksIGhvbGVNYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgaG9sZS5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCAtIDMuMCwgMC4wMiwgcG9zaXRpb24ueik7IC8vIFnluqfmqJnjgpLlnLDpnaLjgavlkIjjgo/jgZvjgotcbiAgICAgICAgICAgICAgICBob2xlLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7IC8vIOWGhuOBjOWcsOmdouOBq+WvvuOBl+OBpuawtOW5s+OBq+OBquOCi+OCiOOBhuOBq+Wbnui7olxuICAgICAgICAgICAgICAgIGhvbGUuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoaG9sZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OBruODgeOCp+ODg+OCr+OBqOmWi+Wni1xuICAgIHByaXZhdGUgY2hlY2tBbmRTdGFydEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub25pZ2lyaUxvYWRlZCAmJiB0aGlzLnRhbnVraUxvYWRlZCkge1xuICAgICAgICAgICAgY29uc3QgaG9sZVBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoMiwgMCwgNSk7IC8vIOeptOOBruS9jee9rlxuXG4gICAgICAgICAgICAvLyDjgYrjgavjgY7jgorjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICAgICAgICAgIGNvbnN0IG9uaWdpcmlUd2VlbiA9IG5ldyBUd2Vlbih0aGlzLm9uaWdpcmkucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgLnRvKHsgeDogaG9sZVBvc2l0aW9uLngsIHo6IGhvbGVQb3NpdGlvbi56IH0sIDUwMDApIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+aZgumWk+OCkjXnp5LjgavoqK3lrppcbiAgICAgICAgICAgICAgICAuZWFzaW5nKEVhc2luZy5RdWFkcmF0aWMuSW5PdXQpXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmlnaXJpLnJvdGF0aW9uLnggKz0gMC4wNTsgLy8g5LiA5a6a44Gu5Zue6Lui6YCf5bqm44Gn5Zue6LuiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOOBiuOBq+OBjuOCiuOBjOeptOOBq+WIsOmBlOOBl+OBn+OCieS4i+OBq+iQveOBoeOCi1xuICAgICAgICAgICAgICAgICAgICBuZXcgVHdlZW4odGhpcy5vbmlnaXJpLnBvc2l0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHsgeTogLTIgfSwgMTAwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lYXNpbmcoRWFzaW5nLlF1YWRyYXRpYy5JbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyDjgZ/jgazjgY3jga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICAgICAgICAgIHRoaXMudGFudWtpVHdlZW4gPSBuZXcgVHdlZW4odGhpcy50YW51a2kucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgLnRvKHsgeDogaG9sZVBvc2l0aW9uLngsIHo6IGhvbGVQb3NpdGlvbi56IH0sIDUwMDApIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+aZgumWk+OCkjXnp5LjgavoqK3lrppcbiAgICAgICAgICAgICAgICAuZWFzaW5nKEVhc2luZy5RdWFkcmF0aWMuSW5PdXQpXG4gICAgICAgICAgICAgICAgLmRlbGF5KDMwMDApIC8vIOOBiuOBq+OBjuOCiuOBjOWLleOBjeWni+OCgeOBpuOBi+OCiTPnp5LpgYXjgozjgabjgZ/jgazjgY3jgYzli5XjgY3lh7rjgZlcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbnVraS5wb3NpdGlvbi55ID0gMTsgLy8g44Gf44Gs44GN44Gu6auY44GV44KS5LiA5a6a44Gr5L+d44GkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOOBn+OBrOOBjeOBjOeptOOBq+WIsOmBlOOBl+OBn+OCieS4i+OBq+iQveOBoeOCi1xuICAgICAgICAgICAgICAgICAgICBuZXcgVHdlZW4odGhpcy50YW51a2kucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oeyB5OiAtMiB9LCAxMDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVhc2luZyhFYXNpbmcuUXVhZHJhdGljLkluKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9uaWdpcmlUd2Vlbi5zdGFydCgpO1xuICAgICAgICAgICAgdGhpcy50YW51a2lUd2Vlbi5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gR1VJ44Gu6Kit5a6aXG4gICAgcHJpdmF0ZSBzZXR1cEdVSSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5ndWkgPSBuZXcgR1VJKCk7XG4gICAgICAgIHRoaXMuZ3VpT2JqID0geyBzdG9wVGFudWtpOiAoKSA9PiB0aGlzLnN0b3BUYW51a2koKSB9O1xuICAgICAgICB0aGlzLmd1aS5hZGQodGhpcy5ndWlPYmosICdzdG9wVGFudWtpJykubmFtZSgn44Gf44Gs44GN44KS5Yqp44GR44KL8J+NmfCfkqgnKTtcbiAgICB9XG5cbiAgICAvLyDjgZ/jgazjgY3jgpLmraLjgoHjgovplqLmlbBcbiAgICBwcml2YXRlIHN0b3BUYW51a2kgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRhbnVraVR3ZWVuKSB7XG4gICAgICAgICAgICB0aGlzLnRhbnVraVR3ZWVuLnN0b3AoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgNSwgMTUpKTsgLy8g44Kr44Oh44Op44Gu5L2N572u44KS6Kq/5pW0XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3R3ZWVuanNfdHdlZW5fanNfZGlzdF90d2Vlbl9lc21fanMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbS0wZTU2NDlcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=