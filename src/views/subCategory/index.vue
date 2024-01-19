<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import GoodsItem from '../home/components/GoodsItem.vue';

const categoryFilter = ref({})
const route = useRoute()
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilter.value = res.data.result
}

onMounted(() => getCategoryFilter())

const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getSubCategory = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.data.result.items
}

onMounted(() => getSubCategory())

const tabChange = () => {
  //切换后重置为第一页
  reqData.value.id = 1
  getSubCategory()
}

//触底无限加载
const disabled = ref(false)
const load = async () => {
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  //这里使用展开运算符对数组进行拼接，也可以使用concat方法
  goodList.value = [...goodList.value, ...res.data.result.items]
  // 加载完毕 停止监听
  if (res.data.result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilter.parentId}` }">{{ categoryFilter.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodList" :good="good" :key="good.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>