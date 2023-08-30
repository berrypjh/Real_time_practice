<template>
  <div>
    <div>Socket</div>
    <div>{{ receivedMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const receivedMessage = ref("");

    const webSocket = new WebSocket("ws://localhost:8005");
    webSocket.onopen = () => {
      console.log("서버와 웹소켓 연결 성공!");
    };

    webSocket.onmessage = event => {
      const message = event.data;
      receivedMessage.value = message;
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return {
      receivedMessage,
    };
  },
};
</script>
