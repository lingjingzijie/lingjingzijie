import Vue from "vue";
const vm = new Vue()

export const successAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
    });
}
export const waringAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
    });
}
export const errorAlert = (msg)=>{
    vm.$message.error(msg);
}