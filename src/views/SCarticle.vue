<template>
  <div class="scarticle">
      <myheader title='我的收藏'>
          <van-icon name="arrow-left" slot="left" @click="$router.back()" />
      </myheader>
      <articles v-for="(v,i) in mydata" :key="i" :DATA=v></articles>
  </div>
</template>

<script>
import myheader from '@/components/myheader'
import articles from '@/components/articles'
import {scarticlelist} from '@/apis/user'
export default {
    data () {
        return {
            mydata : {}
        }
    },
    components: {
        myheader,articles
    },
    async mounted () {
        let res = await scarticlelist()
        // console.log(res);
        this.mydata = res.data.data
        
    }
}
</script>

<style>

</style>