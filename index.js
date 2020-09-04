const ref = require("ref-napi");
const ffi = require("ffi-napi");

const str = ref.types.CString;
const int32 = ref.types.int32;
const size_t = int32;
const size_t_ptr = ref.refType(size_t);
const strPtr = ref.refType(str);
const nabto_handle_t = int32;
const nabto_handle_t_ptr = ref.refType(nabto_handle_t);
const nabto_stream_t = int32;
const nabto_stream_t_ptr = ref.refType(nabto_stream_t);
const nabto_status_t = int32;

const nabto = ffi.Library("./nabto_client_api", {
  nabtoStartup: [nabto_status_t, [str]],
  nabtoShutdown: [nabto_status_t, ["void"]],
  nabtoOpenSession: [nabto_status_t, [nabto_handle_t_ptr, str, str]],
  nabtoCloseSession: [nabto_status_t, [nabto_handle_t]],
  nabtoSetBasestationAuthJson: [nabto_status_t, [nabto_handle_t, str]],
  nabtoVersionString: [nabto_status_t, [strPtr]],
  nabtoRpcSetDefaultInterface: [nabto_status_t, [nabto_handle_t, str, strPtr]],
  nabtoRpcSetInterface: [nabto_status_t, [nabto_handle_t, str, str, strPtr]],
  nabtoRpcInvoke: [nabto_status_t, [nabto_handle_t, str, strPtr]],
  nabtoStreamOpen: [nabto_status_t, [nabto_stream_t_ptr, nabto_handle_t, str]],
  nabtoStreamClose: [nabto_status_t, [nabto_stream_t]],
  nabtoStreamRead: [nabto_status_t, [nabto_stream_t, strPtr, str]],
  nabtoStreamReadIntoBuf: [nabto_status_t, [nabto_stream_t, str,size_t, size_t_ptr]],
  nabtoStreamWrite: [nabto_status_t, [nabto_stream_t, str, size_t]],
  nabtoStatusStr: [str, [int32]],
});


//Test
const nabtoVersionStringPtr = ref.alloc(strPtr);
console.log(nabto.nabtoStartup("./nabto"));
console.log(nabto.nabtoVersionString(nabtoVersionStringPtr));
console.log(nabtoVersionStringPtr.deref().toString());
