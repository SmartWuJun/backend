<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false" :key="index">
                  <span class="item no-finished">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" class="finish-item" type="primary" @click="update(index)">完成</el-button>
                    <el-button class="remove-item" size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template> 
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status == true" :key="index">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" class="restore-item" type="primary" @click="update(index)">还原</el-button>
                </span>
              </div>
            </template> 
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template> 


<script>
import jwt from "jsonwebtoken";

export default {
  created() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.id = userInfo.id;
      this.name = userInfo.name;
    } else {
      this.id = "";
      this.name = "";
    }
    this.getTodolist();
  },
  data() {
    return {
      name: "",
      todos: "",
      activeName: "firstName",
      list: [],
      count: 0,
      id: ""
    };
  },
  computed: {
    Done() {
      let count = 0;
      let length = this.list.length;
      for (let i in this.list) {
        this.list[i].status === 1 ? (count += 1) : (count += 0);
      }
      this.count = count;
      if (count === length || length === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getUserInfo() {
      const token = sessionStorage.getItem("demo-token");
      if (token != null && token != "null") {
        let user = jwt.decode(token);
        return user;
      } else {
        return null;
      }
    },
    getTodolist() {
      const getTodolist = this.$http.get("/api/todolist/" + this.id);
      getTodolist.then(
        res => {
          if (res.status == 200) {
            this.list = res.data.result;
          } else {
            this.$message.error("获取列表失败！");
          }
        },
        error => {
          this.$message.error("获取列表失败");
          console.log(error);
        }
      );
      return getTodolist;
    },
    remove(i) {
      this.$http
        .delete("/api/todolist/" + this.id + "/" + this.list[i].id)
        .then(
          res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getTodolist();
            } else {
              this.$message.error("删除失败");
            }
          },
          err => {
            this.$message.error("删除失败");
            console.log(err);
          }
        );
    },
    update(i) {
      this.$http
        .put(
          `/api/todolist/${this.id}/${this.list[i].id}/${this.list[i]}.status`
        )
        .then(
          res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "任务状态更新成功！"
              });
              this.getTodolist();
            } else {
              this.$message.error("任务状态更新失败！");
            }
          },
          err => {
            this.$message.error("任务状态更新失败！");
            console.log(err);
          }
        );
    },
    addTodos() {
      if (this.todos === "") {
        return false;
      }
      let obj = {
        status: false,
        content: this.todos,
        userId: this.id
      };
      this.$http.post("/api/todolist", obj).then(
        res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "创建成功！"
            });
            this.getTodolist();
          } else {
            this.$message.error("创建失败！");
          }
        },
        err => {
          this.$message.error("创建失败！");
          console.log(err);
        }
      );
      this.todos = "";
    }
    // getTodolist() {
    //   const getTodolist = this.$http.get("/api/todolist/" + this.id);
    //   getTodolist.then(
    //     res => {
    //       if (res.status === 200) {
    //         this.list = res.data.result;
    //       } else {
    //         this.$message.error("获取列表失败！");
    //       }
    //     },
    //     err => {
    //       this.$message.error("获取列表失败！");
    //       console.log(err);
    //     }
    //   );
    //   return getTodolist;
    // }
    // addTodos() {
    //   if (this.todo == "") {
    //     return;
    //   }
    //   let obj = {
    //     status: false,
    //     content: this.todos,
    //     userId: this.id
    //   };
    //   this.$http.post("/api/todolist", obj).then(
    //     res => {
    //       if (res.status === 200) {
    //         console.log(this);

    //         this.$message({
    //           type: "success",
    //           message: "创建成功！"
    //         });
    //         this.getTodolist();
    //       } else {
    //         this.$message.error("创建失败！");
    //       }
    //     },
    //     err => {
    //       this.$message.error("创建失败！");
    //       console.log(err);
    //     }
    //   );
    //   this.todos = "";
    // }
  }
};
</script>

<style scoped>
.el-input {
  margin: 20px auto;
}

.todo-list {
  width: 100%;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  text-align: left;
}
.item {
  font-size: 20px;
}
.item.finished {
  text-decoration: line-through;
  color: #ddd;
}

.pull-right {
  float: right;
}
</style>

