<template>
  <section>
    <v-sheet class="pa-12" color="grey lighten-3">
      <v-row justify="center">
        <v-col v-if="!wallet.connected" cols="auto" class="text-center">
          <div>
            <v-icon class="large-icon">mdi-account-circle-outline</v-icon>
          </div>
          <h6>User Account</h6>
          <v-btn depressed color="primary" class="mt-2" @click="connectWallet">
            {{ btnWalletName }}</v-btn
          >
          <div class="text-caption">
            *make sure your browser has metamask extension
          </div>
        </v-col>
        <v-col v-else cols="12" class="text-center">
          <div>
            <v-icon class="large-icon">mdi-account-circle-outline</v-icon>
          </div>
          <h6>User Account</h6>
          Network ID: <b>{{ wallet.network }}</b> <br />
          Wallet Address: <b>{{ wallet.address }}</b> <br />
          Total Balance: <b>{{ wallet.balance }} ETH</b> <br />
          User Groups: <b>{{ wallet.userGroups }}</b> <br />
          <v-btn
            color="red"
            class="mt-3 white--text"
            small
            @click="disconnectWallet"
            >Disconnect Wallet</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </section>
</template>

<script>
export default {
  name: "UserWallet",
  data() {
    return {
      btnWalletName: "Connect Wallet",
    };
  },
  computed: {
    wallet() {
      return this.$store.state.user.wallet;
    },
  },
  mounted() {
    if (typeof window.ethereum === "undefined") {
      this.btnWalletName = "Download Metamask";
    }
  },
  methods: {
    async contractConnect() {
      // do something..
      console.log(1);
    },
    async connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        await this.$store.dispatch("user/wallet/connectWallet");
      } else {
        // Non-decentralized app browsers...
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
        window.location = "https://metamask.io/download/";
      }
    },
    async disconnectWallet() {
      await this.$store.commit("user/wallet/SET_CONNECTED_DATA", false);
    },
  },
};
</script>

<style scoped>
.large-icon {
  font-size: 70px;
}
</style>
