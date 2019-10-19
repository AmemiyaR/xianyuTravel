<template>
    <div>
        <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=798680e2d8f932660dedaa9796623ed4"></script> 
    <div id="container"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        window.onLoad = function(){ 
                var map = new AMap.Map('container'); 
            } 
            var url = 'https://webapi.amap.com/maps?v=1.4.15&key=798680e2d8f932660dedaa9796623ed4&callback=onLoad'; 
            var jsapi = document.createElement('script'); 
            jsapi.charset = 'utf-8'; 
            jsapi.src = url; 
            document.head.appendChild(jsapi);
    }
}
</script>

<style scoped lang="less">
#container {
    width: 600px;
    height: 600px;
}
</style>