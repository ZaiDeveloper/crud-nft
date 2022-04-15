<template>
  <section>
    <div class="my-10">
      <h4 class="font-weight-bold mb-5">
        Owner Collection
        <v-chip class="ma-2 white--text" color="green" small>
          Total Created: {{ totalTokenCreated }}
        </v-chip>

        <v-btn color="primary" to="/nft/upload" small outlined class="ml-3"
          >Upload NFT</v-btn
        >
      </h4>

      <div>
        <v-alert border="top" colored-border type="info" elevation="2">
          Click reload if the changes are not made, sometimes the network
          requires more time to process the changes.

          <v-btn color="gray" outlined small @click="reloadCollection">
            <v-icon>mdi-refresh</v-icon> Refresh
          </v-btn>
        </v-alert>
        <v-row v-if="ownerCollections.length > 0">
          <v-col
            v-for="(ownerCollection, key) in ownerCollections"
            v-bind:key="key"
            cols="6"
            sm="3"
          >
            <v-img width="100%" :src="ownerCollection.uri"></v-img>
            <div class="pa-2">
              <span> {{ ownerCollection.name }} </span>
              <div class="font-weight-bold">{{ ownerCollection.price }}ETH</div>
              <!-- <div class="font-weight-bold">
                Owner: {{ ownerCollection.owner }}
              </div> -->
              <div class="font-weight-bold">
                Token: {{ ownerCollection.token_id }}
              </div>
              <v-btn
                color="primary"
                :to="`/nft/edit/${ownerCollection.token_id}`"
                block
                >Edit</v-btn
              >
              <v-btn
                color="red"
                block
                class="mt-1"
                plain
                @click="burnNft(ownerCollection.token_id)"
                >Burn</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-sheet v-else class="pa-12" color="grey lighten-3" rounded="true">
          <v-sheet color="grey lighten-3" class="mx-auto text-center">
            NO DATA</v-sheet
          >
        </v-sheet>
      </div>
    </div>
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
      totalTokenCreated: 0,
      ownerCollections: [],
    };
  },
  async mounted() {
    await this.loadNFTs();
  },
  methods: {
    async loadNFTs() {
      if (typeof window.ethereum !== "undefined") {
        const contract = this.$helper.getContract();
        const totalToken = await contract.getTotalToken();
        if (totalToken) {
          this.totalTokenCreated = totalToken.toString();

          for (let token = 1; token <= this.totalTokenCreated; token++) {
            const exist = contract.tokenExist(token).then(async (res) => {
              if (res) {
                const collection = await contract.getCollections(token);
                const image = await contract.tokenURI(token);
                this.ownerCollections.push({
                  token_id: collection.tokenId.toString(),
                  name: collection.name,
                  owner: collection.owner.toString(),
                  price: ethers.utils.formatUnits(
                    collection.price.toString(),
                    "ether"
                  ),
                  sold: collection.sold,
                  uri: image,
                });
              }
            });
          }
        }
      }
    },
    async reloadCollection() {
      this.loading = true;
      this.ownerCollections = [];
      if (typeof window.ethereum !== "undefined") {
        await this.loadNFTs();
      } else {
        this.$toasted.error("Please download metamask first!.", {
          icon: "alert-circle-outline",
        });
      }
      this.loading = false;
    },
    async burnNft(token) {
      this.loading = true;
      const contract = this.$helper.getContract();
      await contract
        .deleteToken(token)
        .then(async (res) => {
          this.ownerCollections = [];
          await this.loadNFTs();
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
