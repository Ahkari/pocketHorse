# pocketHorse
jquery动画轮播插件,内置六种转场方式,包括三种高级模式

###homepage [pocketHorse](http://ahkari.github.io/pocketHorse/).

>####使用方法:
>
>  `$('selector').pocketHorse(option[,imageSrc]);`
>
>####动画参数option
>
>   dotControl : true | false     是否启用点阵控制
>
>   blockControl : true | false 是否启用顺序按钮控制
>
>   isControlerHide : true | false 否隐藏顺序按钮
>
>   stayTime : 3000 播放间隔
>
>   transTime : 1500 转场时长
>
>   transDirection : 'right' | 'left' 转场方向
>
>   transFunction : 'adv-scaleRotate' | 'adv-scale' | 'adv-fragmentFly' | 'slide' | 'push' | 'transparency' 转场动画,支持普通和高级两种类别
>
>   transEasying : 'easeOutExpo' | .. 转场过渡


>####资源参数imageSrc
>
>     存在第二个参数的时候
>
>     [
>
>      './image/IU.jpg',
>
>      './image/saber.jpg',
>
>      './image/umberalla.jpg',
>
>      './image/Wallpaper_1236.jpg'
>
>     ]
>
>   没有该参数时,会默认将html中已有的img元素加载为资源
>
>   <div class="imageArea">
>
>      <img src="./image/IU.jpg">
>
>      <img src="./image/saber.jpg">
>
>      <img src="./image/umberalla.jpg">
>
>      <img src="./image/Wallpaper_1236.jpg">
>
>   </div>

>tips:
>
>1.slide和push使用jquery.animate实现,追求的是位移转场的连续性,方向目前只设置了left和right,曲线支持animate原生和easing插件
>
>2.高级转场adv-scaleRotate,adv-scale和transparency基于css实现,没有转场方向,曲线完整支持css属性transition
>
>3.高级转场adv-fragmentFly基于个人碎片动画插件 [fragmentFly](http://ahkari.github.io/fragmentFly/).实现,取消前一张/下一站张的控制按钮,支持left/right/up/down四个方向,分割量可在插件内部自行修改,但是高密度分割下需要注意性能问题
