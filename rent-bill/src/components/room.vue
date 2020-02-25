<template>
  <div class="room">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="房号">
        <el-input v-model="search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="float: right; margin-right:20px;">
      <el-button @click="openFormDialog()">新增</el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog :title="formTitle" :visible.sync="formDialog" top="10vh" :modal-append-to-body='false' width="30%">
      <el-form :model="formModel">
        <el-form-item label="房号">
          <el-input v-model="formModel.roomNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formModel.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formDialog = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- main -->
    <el-container>
      <el-table :data="tableData" height="500" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="roomNumber" label="房号">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button size="small" @click="openFormDialog(scope.row)">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <!-- 分页 -->
    <div class="block" style="float:right; margin-top:10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'room',
  data() {
    return {
      formDialog: false,
      formTitle:'',
      formModel: {},
      tableData: [],
      page: {
        currentPage: 1,
        pageSizes: [8,10, 20, 30, 40],
        pageSize: 8,
        total: 0
      },
      pageUrl:'room/',
      search: '',
      multipleSelection: [],
    }
  },
  mounted: function () {
    this.loadTableData();
  },
  methods: {
    loadTableData() {
      var url = this.pageUrl+"listPage";
      let requestData = {
        pageSize:this.page.pageSize,
        currentPage : this.page.currentPage
      };
      Axios.post(url,requestData).then((response) => {
        let serverResponse = response.data;
        if (serverResponse && serverResponse.data != null) {
          this.tableData = serverResponse.data;
          this.page.total = serverResponse.total;
        }
      });
    },
    openFormDialog(model) {
      this.formDialog = true;
      this.formTitle = model ? '修改' : '新增';
      if(model) {
        this.formModel = model;
      } else {
        this.formModel =  {
          roomNumber:  null,
          status: null
        }
      }
    },
    save() {
      let requestData = {
        id: this.formModel.id,
        roomNumber: this.formModel.roomNumber,
        status: this.formModel.status
      };
      var url = this.pageUrl+ 'save';
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: requestData.id ? '修改成功' : '创建成功',
            type: 'success'
          });
          this.loadTableData();
          this.formDialog = false;
        } else {
          this.$notify.error({
            message: requestData.id ? '修改失败' : '创建失败'
          });
        }
      });
    },
    deleteRow(row) {
      var url = this.pageUrl+"delete";
      let requestData = {
        id: row.id
      };
      this.$confirm('确认删除吗?', '提示', {}).then(() => {
        Axios.post(url, requestData).then((response) => {
          if (response && response.data && response.data.data) {
            this.loadTableData();
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.loadTableData();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.loadTableData();
    },
    onSubmit() {
      console.log(1);
    },
    // handleClick(row) {
    //   console.log(row);
    // },

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
.el-dialog .el-form-item{
  margin-left: 20px;
}
.el-dialog .el-input{ 
  width: 330px;
}
</style>