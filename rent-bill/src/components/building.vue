<template>
  <div class="building">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="栋数">
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
      <el-button @click="addDialog = true">新增</el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="增加房屋" :visible.sync="addDialog" top="10vh" :modal-append-to-body='false' width="30%">
      <el-form :model="addForm">
        <el-form-item label="栋数">
          <el-input v-model="addForm.buildingNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="addForm.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑房屋" :visible.sync="editDialog" top="10vh" :modal-append-to-body='false' width="30%">
      <el-form :model="editForm">
        <el-form-item label="栋数">
          <el-input v-model="editForm.buildingNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="editForm.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- main -->
    <el-container>
      <el-table :data="tableData" height="500" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="buildingNumber" label="房屋">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
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
  name: 'building',
  data() {
    return {
      addDialog: false,
      editDialog: false,
      addForm: {
        buildingNumber: '',
        status: ''
      },
      editForm: {
        id: '',
        buildingNumber: '',
        status: ''
      },
      tableData: [],
      page: {
        currentPage: 1,
        pageSizes: [8,10, 20, 30, 40],
        pageSize: 8,
        total: 0
      },
      pageUrl:'building/',
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
    add() {
      var url = this.pageUrl+"create";
      let requestData = {
        buildingNumber: this.addForm.buildingNumber,
        status: this.addForm.status
      };
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '创建成功',
            type: 'success'
          });
          this.loadTableData();
          this.addDialog = false;
        } else {
          this.$notify.error({
            message: '创建失败'
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
    edit(row) {
      this.editForm = row;
      this.editDialog = true;
    },
    confirmEdit() {
      var url = this.pageUrl+"update";
      Axios.post(url, this.editForm).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '修改成功',
            type: 'success'
          });
          this.loadTableData();
          this.editDialog = false;
        } else {
          this.$notify.error({
            message: '修改失败'
          });
        }
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