require=function s(r,a,h){function c(i,t){if(!a[i]){if(!r[i]){var e="function"==typeof require&&require;if(!t&&e)return e(i,!0);if(u)return u(i,!0);var n=new Error("Cannot find module '"+i+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[i]={exports:{}};r[i][0].call(o.exports,function(t){return c(r[i][1][t]||t)},o,o.exports,s,r,a,h)}return a[i].exports}for(var u="function"==typeof require&&require,t=0;t<h.length;t++)c(h[t]);return c}({CameraFollow:[function(t,i,e){"use strict";cc._RF.push(i,"d8feaqc5KdBeqSRYmxe6ZE3","CameraFollow"),cc.Class({extends:cc.Component,properties:{speed:cc.Float,knife:{default:null,visible:function(){return!1},type:cc.Node}},start:function(){this.threshold=this.knife.y},update:function(t){1<cc.pDistance(this.node.position,cc.v2(0,this.threshold+570))&&(this.node.position=cc.pLerp(this.node.position,cc.v2(0,this.threshold+570),this.speed*t))},move:function(t){this.threshold=t.y}}),cc._RF.pop()},{}],FruitSpawner:[function(t,i,e){"use strict";cc._RF.push(i,"54557eRg5tGX7eZTYa/uRw1","FruitSpawner"),cc.Class({extends:cc.Component,properties:{fruits:{default:[],type:cc.Prefab},fruitParent:cc.Node,knife:{default:null,visible:function(){return!1},type:cc.Node},knives:{default:[],type:cc.Node},upDownSpeed:2,upDownThreshold:.2,upDownThresholdIncreamentAmount:.1,fruitFallingGravity:2,splashPrefab:cc.Prefab},start:function(){window.lastRandomNumber||(window.lastRandomNumber=0),this.knife=this.knives[this.uncommonRandomNumer(this.knives.length)],cc.Camera.main.node.getComponent("CameraFollow").knife=this.knife,this.knife.active=!0,this.knifeComponent=this.knife.getComponent("Knife"),this.knifeComponent.init(),this.minimumHorizontalMargin=120,this.maximumHorizontalMargin=280,this.currentHorizontalMargin=this.maximumHorizontalMargin,this.initialUpDownThreshold=this.upDownThreshold,this.maximumFruitArrayLength=this.fruits.length,this.currentFruitArrayLength=3,this.lastSpawnedFruit=null,this.addFrutisToPool(),this.addSplashesToPool()},addFrutisToPool:function(){this.pools=[];for(var t=null,i=0,e=this.fruits.length;i<e;i++){this.pools.push(new cc.NodePool("myPool"+i.toString()));for(var n=0;n<5;n++){var o=(t=cc.instantiate(this.fruits[i])).getComponent("Fruit");o.poolIndex=i,o.setDefaults(this),this.pools[i].put(t)}}},addSplashesToPool:function(){this.splashPool=new cc.NodePool("splashPool");for(var t=0;t<10;t++){var i=cc.instantiate(this.splashPrefab);this.splashPool.put(i),i.getComponent("Splash").onAddedToPool(this),i.zIndex=-1}},spawnSplash:function(t,i){var e=this.splashPool.get();e.parent=this.fruitParent,e.position=cc.v2(this.randomRangeFloat(t.x-50,t.x+50),this.randomRangeFloat(t.y-50,t.y+50)),e.rotation=this.randomRangeInt(0,360),(this.lastSpawnedSplash=e).getComponent("Splash").onSpawn(i)},increase:function(){this.currentHorizontalMargin>this.minimumHorizontalMargin&&(this.currentHorizontalMargin-=20),this.currentFruitArrayLength<this.maximumFruitArrayLength&&this.currentFruitArrayLength++,this.upDownThreshold<7&&(this.upDownThreshold+=this.upDownThresholdIncreamentAmount)},spawnFruit:function(){var t=this.pools[this.uncommonRandomNumer(this.currentFruitArrayLength)].get();t.parent=this.fruitParent,t.getComponent("Fruit").onSpawn();var i=this.knife.convertToWorldSpaceAR(cc.Vec2.ZERO),e=i.x-250,n=i.x+250,o=e>=this.currentHorizontalMargin,s=n<=cc.Canvas.instance.node.width-this.currentHorizontalMargin,r=2;r=o&&s?this.randomRangeInt(0,2):r;var a=0,h=i.y+600;0==(r=2==r?o?0:1:r)?(a=this.randomRangeFloat(this.currentHorizontalMargin,e),this.knifeComponent.rotateSpeed<0&&(this.knifeComponent.rotateSpeed*=-1)):1==r&&(a=this.randomRangeFloat(n,cc.Canvas.instance.node.width-this.currentHorizontalMargin),0<this.knifeComponent.rotateSpeed&&(this.knifeComponent.rotateSpeed*=-1)),this.lastSpawnedFruit?(h=this.lastSpawnedFruit.y+700,t.x=this.fruitParent.convertToNodeSpaceAR(cc.v2(a,0)).x,t.y=h):(h=i.y+700,t.position=this.fruitParent.convertToNodeSpaceAR(cc.v2(a,h))),this.lastSpawnedFruit=t},uncommonRandomNumer:function(t){var i=this.randomRangeInt(0,t);return i==window.lastRandomNumber&&(0==i?i++:i==t-1?i--:i++),window.lastRandomNumber=i},randomRangeInt:function(t,i){return Math.floor(this.randomRangeFloat(t,i))},randomRangeFloat:function(t,i){return Math.random()*(i-t)+t},returnToFruitPool:function(t){this.pools[t.getComponent("Fruit").poolIndex].put(t)},returnToSplashPool:function(t){this.splashPool.put(t)},returnExistingFruitsAndSplashes:function(){for(var t=0,i=this.fruitParent.children;t<i.length;t++)"fruit"==i[t].group?this.pools[i[t].getComponent("Fruit").poolIndex].put(i[t]):this.splashPool.put(i[t]);cc.log(this.fruitParent.children)}}),cc._RF.pop()},{}],Fruit:[function(t,i,e){"use strict";cc._RF.push(i,"eace1ZBvRdEZb363Ilk+Pmk","Fruit"),cc.Class({extends:cc.Component,properties:{temp:{default:0,visible:function(){return!1}},poolIndex:{default:0,visible:function(){return!1}},fruitSpawner:{default:null,visible:function(){return!1}},splashColor:cc.Color,defaultSprite:{default:null,type:cc.SpriteFrame,visible:function(){return!1}},hittedSprite:cc.SpriteFrame},setDefaults:function(t){this.fruitSpawner=t,this.initialScaleX=this.node.scaleX,this.initialScaleY=this.node.scaleY,this.defaultSprite=this.node.getComponent(cc.Sprite).spriteFrame,this.keepMoving=!1,this.fallDown=!1,this.isHitted=!1,this.temp=0},onSpawn:function(){this.node.scaleX=.07,this.node.scaleY=.07,this.keepMoving=!0,this.isHitted=!1,this.fallDown=!1,this.temp=0,this.node.getComponent(cc.Sprite).spriteFrame=this.defaultSprite;var t=cc.scaleTo(.3,this.initialScaleX,this.initialScaleY);this.node.runAction(t)},onHitByKnife:function(){this.keepMoving=!1,this.isHitted=!0,this.node.scaleY=.9,this.node.getComponent(cc.Sprite).spriteFrame=this.hittedSprite},update:function(t){this.keepMoving?(this.temp+=this.fruitSpawner.upDownSpeed*t,this.node.y+=Math.sin(this.temp)*this.fruitSpawner.upDownThreshold):this.fallDown&&(this.temp-=this.fruitSpawner.fruitFallingGravity*t,this.node.y+=this.temp*t)},onFallDown:function(){this.fruitSpawner.returnToFruitPool(this.node)},onCollisionEnter:function(t,i){2==t.tag&&this.onFallDown()}}),cc._RF.pop()},{}],Knife:[function(t,i,e){"use strict";cc._RF.push(i,"9da89QGLIlHvbPihZCY1XMR","Knife"),cc.Class({extends:cc.Component,properties:{touchDetector:cc.Node,jumpForce:cc.Float,gravity:cc.Float,rotateSpeed:cc.Float,hitSpeed:cc.Float,fruitSpawnerNode:cc.Node},init:function(){this.goForHit=!1,this.knifeInitialPos=this.node.y,this.jump=!1,this.yPos=this.node.y,this.lookAtPoint={},this.cameraFollow=cc.Camera.main.node.getComponent("CameraFollow"),this.fruitSpawner=this.fruitSpawnerNode.getComponent("FruitSpawner"),this.uiManager=this.fruitSpawnerNode.getComponent("UIManager"),this.hittedFruit=null},registerEvents:function(){this.touchDetector.active=!0,this.touchDetector.setContentSize(cc.Canvas.instance.node.getContentSize()),this.touchDetector.on("touchstart",this.onMouseDown,this),this.touchDetector.on("touchend",this.onMouseUp,this)},onMouseDown:function(){this.goForHit||(this.uiManager.playAudio("jump"),this.jump=!0),this.yPos=this.jumpForce,this.hittedFruit&&(this.hittedFruit.getComponent("Fruit").fallDown=!0,this.fruitSpawner.lastSpawnedSplash.getComponent("Splash").fadeOut(),this.hittedFruit=null),console.clear()},onMouseUp:function(){this.uiManager.playAudio("throw"),this.jump=!1,this.goForHit=!0,this.cameraFollow.move(this.fruitSpawner.lastSpawnedFruit);var t=(this.node.rotation+90)*(Math.PI/180);this.lookAtPoint.x=Math.cos(-t),this.lookAtPoint.y=Math.sin(-t)},onCollisionEnter:function(t,i){if(1==t.tag){if(this.goForHit=!1,!t.node.getComponent("Fruit").isHitted){this.hittedFruit=t.node,this.hittedFruit.getComponent("Fruit").onHitByKnife(),this.uiManager.playAudio("hit"),this.fruitSpawner.spawnFruit();var e=this.calculateScore();this.uiManager.spawnScoreObj(t.node.position,e,t.node.getComponent("Fruit").splashColor),this.lastRot=this.node.rotation,this.uiManager.increaseScore(e),this.fruitSpawner.spawnSplash(cc.v2(this.node.x+170*this.lookAtPoint.x,this.node.y+170*this.lookAtPoint.y),t.node.getComponent("Fruit").splashColor)}}else 2==t.tag?this.onDeath():3==t.tag&&(t.enabled=!1,this.uiManager.cycleBGs(t.node))},calculateScore:function(){var t=Math.abs(this.node.rotation),i=t-360*Math.floor(t/360),e=!1;return this.lastRot&&(e=this.lastRot<0&&this.node.rotation<0||0<this.lastRot&&0<this.node.rotation),this.node.rotation=i*(this.node.rotation<0?-1:1),e?720<t?1:2:360<t?1:2},checkForDeath:function(){var t=this.node.convertToWorldSpaceAR(cc.Vec2.ZERO),i=cc.Camera.main.node.convertToWorldSpaceAR(cc.Vec2.ZERO),e=cc.Canvas.instance.node.height/2;(t.y>e+i.y+150||t.y<i.y-e-150||t.x>cc.Canvas.instance.node.width/2+150+i.x||t.x<-150)&&this.onDeath()},onDeath:function(){this.goForHit=!1,this.goForHit=!1,this.touchDetector.active=!1,this.touchDetector.off(),this.touchDetector.off(),this.uiManager.onDeath(),console.log("death")},update:function(t){if(this.jump)this.yPos-=this.gravity*t,this.node.y+=this.yPos,this.node.rotation+=this.rotateSpeed*t;else if(this.goForHit){var i=this.hitSpeed*t;this.node.x+=this.lookAtPoint.x*i,this.node.y+=this.lookAtPoint.y*i}}}),cc._RF.pop()},{}],ScoreObj:[function(t,i,e){"use strict";cc._RF.push(i,"28e6d0HPhtPD74pC5hESdqs","ScoreObj"),cc.Class({extends:cc.Component,properties:{},animate:function(t){var i=this;this.node.getComponent(cc.Label).string=t.toString()+"+";this.node.runAction(cc.moveBy(1,cc.v2(0,500))),setTimeout(function(){i.node.runAction(cc.fadeOut(.5))},500),setTimeout(function(){i.node.destroy()},1e3)}}),cc._RF.pop()},{}],Splash:[function(t,i,e){"use strict";cc._RF.push(i,"03ff2A42PFOoqbBbYEAzEPJ","Splash"),cc.Class({extends:cc.Component,properties:{splashes:{default:[],type:cc.Node}},onAddedToPool:function(t){this.fruitSpawner=t,this.scaleUp=!1,this.isFadeOut=!1},onSpawn:function(t){for(var i=0;i<3;i++)this.splashes[i].setScale(0,0),this.splashes[i].color=t;this.scaleUp=!0},fadeOut:function(){var t=this;setTimeout(function(){t.isFadeOut=!0},1e3)},onCollisionEnter:function(t,i){2==t.tag&&(this.node.opacity=255,this.scaleUp=!1,this.isFadeOut=!1,this.fruitSpawner.returnToSplashPool(this.node))},update:function(t){if(this.splashes[0].scaleX<1.1)for(var i=cc.lerp(this.splashes[0].scaleX,1.2,15*t),e=0;e<3;e++)this.splashes[e].setScale(i,i);else this.isFadeOut&&1<this.node.opacity&&(this.node.opacity=cc.lerp(this.node.opacity,0,2*t))}}),cc._RF.pop()},{}],UIManager:[function(t,i,e){"use strict";cc._RF.push(i,"7a592QOeLxN6IlJF5hWhLZm","UIManager"),cc.Class({extends:cc.Component,properties:{score:{default:0,visible:function(){return!1}},playPanel:cc.Node,retryPanel:cc.Node,scoreParentNode:cc.Node,inGameCurrentScore:cc.Label,inGameHighScore:cc.Label,onDeathCurrentScore:cc.Label,onDeathHighestScore:cc.Label,throwAudio:cc.AudioSource,hitAudio:cc.AudioSource,jumpAudio:cc.AudioSource,scoreObj:cc.Prefab},increaseScore:function(t){this.score+=t,this.score%3==0&&this.fruitSpawner.increase(),this.score>window.highScore&&(window.highScore=this.score),this.inGameCurrentScore.string=this.score.toString(),this.inGameHighScore.string=window.highScore.toString()},onDeath:function(){this.onDeathCurrentScore.string=this.inGameCurrentScore.string,this.onDeathHighestScore.string=this.inGameHighScore.string,this.retryPanel.active=!0},onLoad:function(){cc.director.getCollisionManager().enabled=!0},start:function(){this.audios={},this.audios.throw=this.throwAudio,this.audios.hit=this.hitAudio,this.audios.jump=this.jumpAudio,this.canvasSize=cc.Canvas.instance.node.getContentSize(),this.playPanel.children[0].setContentSize(this.canvasSize),this.retryPanel.children[0].setContentSize(this.canvasSize),cc.Camera.main.node.setContentSize(this.canvasSize),window.highScore?this.inGameHighScore.string=window.highScore.toString():window.highScore=0,this.startCycle=!1,this.BGs=cc.Canvas.instance.node.children[0].children,this.canvasHeight=cc.Canvas.instance.node.height,this.fruitSpawner=this.node.getComponent("FruitSpawner"),this.decorateBGs(),window.Global&&window.Global.isReplay&&this.play()},playAudio:function(t){this.audios[t].play()},decorateBGs:function(){for(var t=1;t<this.BGs.length;t++)this.BGs[t].y=this.BGs[t-1].y+this.BGs[0].height},cycleBGs:function(t){if(this.startCycle){var i=this.BGs.shift();i.y=this.BGs[this.BGs.length-1].y+this.BGs[0].height,i.getComponent(cc.Collider).enabled=!0,this.BGs.push(i)}else 1==this.BGs.indexOf(t)&&(this.startCycle=!0)},play:function(){var t=this;window.Global={},window.Global.isReplay=!1,this.fruitSpawner.spawnFruit(),this.playPanel.active=!1,this.fruitSpawner.knife.children[0].getComponent(cc.Sprite).enabled=!0,setTimeout(function(){t.fruitSpawner.knife.getComponent("Knife").registerEvents()},200)},retry:function(){window.Global.isReplay=!0,cc.director.loadScene("1st")},spawnScoreObj:function(t,i,e){var n=cc.instantiate(this.scoreObj);n.color=e,n.position=cc.v2(t.x,t.y+200),n.parent=this.fruitSpawner.fruitParent,n.getComponent("ScoreObj").animate(i)}}),cc._RF.pop()},{}]},{},["CameraFollow","Fruit","FruitSpawner","Knife","ScoreObj","Splash","UIManager"]);