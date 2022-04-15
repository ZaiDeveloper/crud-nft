<template>
  <section class="my-10">
    <div class="text-center">
      <h6 class="font-weight-bold">Edit NFT</h6>
      <v-divider class="my-3"></v-divider>
    </div>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-alert dense type="info" class="mb-0">
          Current NFT Token: {{ currentToken }}
        </v-alert>
      </v-col>
      <div style="width: 100%"></div>
      <v-col v-if="wallet.connected" cols="12" sm="6">
        <h5 class="font-weight-bold text-center">
          Upload image to ipfs and smart contract (NFT)
        </h5>
        <div>
          <form enctype="multipart/form-data" @submit.prevent="update">
            <v-text-field v-model="name" label="Name"></v-text-field>
            <v-text-field
              v-model="price"
              label="Price"
              suffix="ETH"
            ></v-text-field>
            <v-text-field
              v-model="address"
              label="Wallet Address"
            ></v-text-field>

            <v-btn type="submit" color="primary" block> Update NFT </v-btn>
            <div class="text-caption my-3">*This tool for owner only.</div>
          </form>
        </div>
      </v-col>
      <v-col v-else cols="12" sm="6">
        <v-alert dense outlined type="error">
          Please connect with owner wallet first!
        </v-alert>
      </v-col>
    </v-row>
    <v-overlay v-if="loading" :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </section>
</template>

<script>
import { ethers } from "ethers";

export default {
  data() {
    return {
      loading: false,
      name: "",
      price: "",
      currentToken: "",
      address: "",
    };
  },
  computed: {
    wallet() {
      return this.$store.state.user.wallet;
    },
    walletAddress() {
      return this.$store.state.user.wallet.address;
    },
  },
  watch: {
    walletAddress(newValue, oldValue) {
      this.address = newValue;
    },
  },
  async mounted() {
    this.currentToken = this.$route.params.id;
    this.address = this.walletAddress;

    const contract = this.$helper.getContract();
    const collection = await new contract.collections(this.currentToken);
    if (collection) {
      this.name = collection.name;
      this.price = ethers.utils.formatUnits(
        collection.price.toString(),
        "ether"
      );
    }
    console.log(9, collection);
  },
  methods: {
    async update() {
      this.loading = true;

      const contract = this.$helper.getContract();

      await new contract.updateToken(
        this.$route.params.id,
        ethers.utils.parseEther(this.price).toString(),
        this.name
      )
        .then(async (res) => {
          this.$toasted.success("Updated Successfully.", {
            icon: "check-decagram-outline",
          });

          this.$nuxt.refresh();
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(12, err);
          if (err.code === 4001) {
            this.$toasted.error(err.message, {
              icon: "alert-circle-outline",
            });
          } else {
            this.$toasted.error(err.data.message, {
              icon: "alert-circle-outline",
            });
          }
        });

      this.loading = false;
    },
  },
};
</script>
