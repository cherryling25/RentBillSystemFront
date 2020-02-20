<template>
  <div class="room">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="日期">
        <el-input v-model="search" placeholder="输入关键字搜索"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="search" placeholder="输入关键字搜索"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="float: right;">
      <el-button @click="addTenant()">增加租客</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第2、第3行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <el-container>
      <el-table :data="tableData" height="650" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="zip" label="邮件" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
//import Axios from 'axios';
export default {
  name: 'room',
    data() {
      return {
        search:'',
        multipleSelection: [],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          zip: 200333,
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-01',
          name: 'ling',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: 'jack',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
  methods:{
    addTenant(){

      // var obj =
      //     {date: '2016-09-03',
      //     name: '虎',
      //     zip: 200333,
      //     address: '上海市普陀区金沙江路 1518 弄'};
      // tableData: [{
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     zip: 200333,
      //     address: '上海市普陀区金沙江路 1518 弄',
      //   }]
      // var url = "document/add";
      // let requestData = {
      //   categoryId: this.noteForm.categoryId,
      //   title: this.noteForm.noteName,
      //   content: this.noteForm.noteContent
      // };
      // Axios.post(url, requestData).then((response) => {
      //   if (response.data.data) {
      //     this.$notify({
      //       message: '创建成功',
      //       type: 'success'
      //     });
      //     this.listCategory();
      //     this.detail(response.data.data.id);
      //     this.dialogFormVisible1 = false;
      //   } else {
      //     this.$notify.error({
      //       message: '创建失败'
      //     });
      //   }
      // });
    },


    onSubmit(){
      console.log(1);
    },
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    toggleSelection(rows) {
      
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
<style scoped>
.el-form{
  display: inline;
}
</style>