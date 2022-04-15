<template>
  <section class="my-10">
    <div class="text-center">
      <h6 class="font-weight-bold">Upload NFT</h6>
      <v-divider class="my-3"></v-divider>
    </div>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-alert dense type="info" class="mb-0">
          Last NFT Token Created: {{ LastNftToken }}
        </v-alert>
      </v-col>
      <div style="width: 100%"></div>
      <v-col v-if="wallet.connected" cols="12" sm="6">
        <h5 class="font-weight-bold text-center">
          Upload image to ipfs and smart contract (NFT)
        </h5>
        <div>
          <form enctype="multipart/form-data" @submit.prevent="upload">
            <v-text-field v-model="name" label="Name"></v-text-field>
            <v-text-field
              v-model="price"
              label="Price"
              suffix="ETH"
            ></v-text-field>
            <v-file-input
              v-model="file"
              accept="image/*"
              label="Image, Video, Audio, or 3D Model"
            ></v-file-input>
            <v-text-field
              v-model="address"
              label="Wallet Address"
            ></v-text-field>

            <v-btn type="submit" color="primary" block> Upload NFT </v-btn>
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
      file: null,
      name: "test 1",
      price: "1",
      LastNftToken: 0,
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
  mounted() {
    this.getLastToken();
    this.address = this.walletAddress;
  },
  methods: {
    async getLastToken() {
      const contract = this.$helper.getContract();
      let totalToken = await new contract.getTotalToken();
      this.LastNftToken = totalToken.toString();
    },
    async upload() {
      this.loading = true;
      const contract = this.$helper.getContract();

      //save into ipfs using pinata
      let formData = new FormData();
      formData.append("file", this.file);
      const response = await this.$store
        .dispatch("ipfs/save", formData)
        .then(function (response) {
          return response;
        });

      const urlExternal = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
      // const urlIpfs = `https://ipfs.io/ipfs/${response.IpfsHash}`;

      await new contract.createToken(
        urlExternal,
        ethers.utils.parseEther(this.price).toString(),
        this.name
      )
        .then(async (res) => {
          let tx = await res.wait();
          console.log("Transaction: ", tx);

          this.$toasted.success("Created Successfully.", {
            icon: "check-decagram-outline",
          });

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
