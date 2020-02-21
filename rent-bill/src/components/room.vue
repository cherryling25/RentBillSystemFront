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
      <el-button @click="addDialog = true">增加房间</el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="增加房间" :visible.sync="addDialog" top="10vh" :modal-append-to-body='false' width="30%">
      <el-form :model="addRoomForm">
        <el-form-item label="房号" :label-width="formLabelWidth">
          <el-input v-model="addRoomForm.roomNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="addRoomForm.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRoom()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑房间" :visible.sync="editDialog" top="10vh" :modal-append-to-body='false' width="30%">
      <el-form :model="editRoomForm">
        <el-form-item label="房号" :label-width="formLabelWidth">
          <el-input v-model="editRoomForm.roomNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="editRoomForm.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditRoom()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- main -->
    <el-container>
      <el-table :data="roomList" height="500" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="roomNumber" label="房号">
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
  name: 'room',
  data() {
    return {
      addDialog: false,
      editDialog: false,
      formLabelWidth: '60px',
      addRoomForm: {
        roomNumber: '',
        status: ''
      },
      editRoomForm: {
        id: '',
        roomNumber: '',
        status: ''
      },
      roomList: [],
      page: {
        currentPage: 1,
        pageSizes: [8,10, 20, 30, 40],
        pageSize: 8,
        total: 0
      },

      search: '',
      multipleSelection: [],
    }
  },
  mounted: function () {
    this.listRoom();
  },
  methods: {
    listRoom() {
      var url = "room/listPage";
      let requestData = {
        pageSize:this.page.pageSize,
        currentPage : this.page.currentPage
      };
      Axios.post(url,requestData).then((response) => {
        let serverResponse = response.data;
        if (serverResponse && serverResponse.data != null) {
          this.roomList = serverResponse.data;
          this.page.total = serverResponse.total;
        }
      });
    },
    addRoom() {
      var url = "room/create";
      let requestData = {
        roomNumber: this.addRoomForm.roomNumber,
        status: this.addRoomForm.status
      };
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '创建成功',
            type: 'success'
          });
          this.listRoom();
          this.addDialog = false;
        } else {
          this.$notify.error({
            message: '创建失败'
          });
        }
      });
    },

    deleteRow(row) {
      var url = "room/delete";
      let requestData = {
        id: row.id
      };
      this.$confirm('确认删除吗?', '提示', {}).then(() => {
        Axios.post(url, requestData).then((response) => {
          if (response && response.data && response.data.data) {
            this.listRoom();
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      });
    },
    edit(row) {
      this.editRoomForm = row;
      this.editDialog = true;
    },
    confirmEditRoom() {
      var url = "room/update";
      Axios.post(url, this.editRoomForm).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '修改成功',
            type: 'success'
          });
          this.listRoom();
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
      this.listRoom();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.listRoom();
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
</style>