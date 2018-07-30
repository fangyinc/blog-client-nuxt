<template>
  <div>
    <!-- 来必力City版安装代码 -->
    <!--<div id="lv-container" data-id="city" :data-uid="uid"></div>-->
    <!--<div id="my-livere-id">
      <div id="lv-container" data-id="city" data-uid="MTAyMC8zMDA0OC82NjEy"></div>
    </div>-->
    <div id="lv-container"
         :data-id="id"
         :data-uid="uid"
    ></div>
  </div>
</template>

<script>
  /* eslint-disable */

  import loadResource from '~/utils/load-resource'
  export default {
    name: 'LivereComment',
    // props: {
    //   postUrl: {
    //     type: String,
    //     required: true
    //   }
    // },
    props: ['id', 'uid'],

    mounted () {
      const ds = document.createElement('script');
      if (typeof LivereTower === 'function') return;
      ds.type = 'text/javascript';
      ds.async = true;
      ds.src = 'https://cdn-city.livere.com/js/embed.dist.js';
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ds, s);

      // this.loadScript('https://cdn-city.livere.com/js/embed.dist.js')

      // this.uid = process.env.livereUid

      // window.refer = this.postUrl
      // setTimeout(() => {
      //   let d = document
      //   let s = d.createElement('script')
      //   s.type = 'text/javascript'
      //   s.async = true
      //   s.src = 'https://cdn-city.livere.com/js/embed.dist.js'
      //   ;(d.head || d.body).appendChild(s)
      // }, 0)

      // (function (d, s) {
      //   var j, e = d.getElementsByTagName(s)[0] // eslint-disable-line
      //
      //   if (typeof LivereTower === 'function') {
      //     return
      //   }
      //
      //   j = d.createElement(s)
      //   j.src = 'https://cdn-city.livere.com/js/embed.dist.js'
      //   j.async = true
      //
      //   e.parentNode.insertBefore(j, e)
      // })(document, 'script')
    },
    methods: {
      loadScript (src, callback) {
        if (!(typeof callback === 'function')) {
          callback = function() {};
        }

        var check = document.querySelectorAll("script[src='" + src + "']");
        // var check = document.querySelectorAll("#livere-uuid");
        console.log(check)
        if (check.length > 0) {
          check[0].addEventListener('load', function() {
            callback();
          });
          callback();
          return;
        }

        var script = document.createElement('script');
        var body = document.getElementsByTagName('body')[0];
        // var body = document.getElementById('my-livere-id');
        // var body = document.getElementById('lv-container');
        // alert('body is : ')
        console.log(body)
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.src = src;
        if (script.addEventListener) {
          script.addEventListener('load', function () {
            callback();
          }, false);
        } else if (script.attachEvent) {
          script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
              callback();
            }
          });
        }
        body.appendChild(script);
      }
    }

  }
</script>

<style scoped>

</style>