<template>
  <div class="about">
    <!-- <nav-bar /> -->
    <div class="container" >
      <h3 class="text-gray" :style="{'margin-top': marginTop}">
        Architecture<b-icon icon="chevron-compact-right"></b-icon>
        <strong class="text-primary">AWS</strong>
      </h3>
      <hr />

      <!-- page-content -->
      <div class="d-flex py-3 mb-1">
        <h4 class="fw-bold mr-4">Imported Accounts</h4>
        <b-button variant="outline-secondary" v-b-modal.add-account
          ><b-icon icon="plus-square" class="mr-1"></b-icon> New
          Account</b-button
        >
        <!-- add account modal start -->
        <b-modal
          class="modal"
          id="add-account"
          size="xl"
          title="New AWS Account"
          ok-title="Submit"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleSubmit"
        >
          <h4>
            Follow these steps to import your Account in<br />
            ClouDay1 Architecture
          </h4>

          <!-- @submit="onSubmit"
            @reset="onReset" -->
          <b-form
            v-if="show"
            ref="formValid"
            class="d-flex justify-content-between"
            @submit="onSubmit"
          >
            <div class="content">
              <span class="fw-bold">1. Create a new IAM Role</span>
              <span class="description"
                >ClouDay1 Architecture can connect to AWS and import your
                account. You need a new or existing IAM user with at least the
                following permissions.</span
              >
              <b-card header="IAM Permissions" class="card">
                <b-card-text class="card-text">
                  <!-- <textarea
                    class="textarea"
                    name=""
                    id=""
                    v-model="policy"
                  ></textarea> -->
                  <pre class="m-0" style="max-height: 200px">{{ policy }}</pre>
                </b-card-text>
              </b-card>
            </div>
            <div class="content">
              <section>
                <span class="fw-bold"
                  >2. Authenticate ClouDay1 Architecture</span
                >
                <span class="description"
                  >Enter the access key credentials for your IAM user.</span
                >
                <b-card class="card" bg-variant="light">
                  <b-card-text class="card-text">
                    <b-form-group
                      label-cols="6"
                      label-cols-lg="4"
                      label-size="sm"
                      label="AWS Access Key"
                      label-for="access-key"
                      label-align="center"
                      :state="state"
                    >
                      <b-form-input
                        id="access-key"
                        v-model="form.aws_access_key_id"
                        placeholder="Enter Your Access Key"
                        size="sm"
                        :state="state"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label-cols="6"
                      label-cols-lg="4"
                      label-size="sm"
                      label="AWS Secret key"
                      label-for="secret-key"
                      label-align="center"
                      :state="state"
                    >
                      <b-form-input
                        id="secret-key"
                        v-model="form.aws_secret_access_key"
                        placeholder="Enter Your Secret Key"
                        size="sm"
                        :state="state"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label-cols="6"
                      label-cols-lg="4"
                      label-size="sm"
                      label="Session Token (Optional)"
                      label-for="input-sm"
                      label-align="center"
                    >
                      <b-form-input
                        id="input-sm"
                        v-model="form.aws_session_token"
                        placeholder="Enter Your Session Token"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                    <!--  -->
                    <b-form-group
                      label-cols="6"
                      label-cols-lg="4"
                      label-size="sm"
                      label="Region"
                      label-for="input-sm"
                      label-align="center"
                      :state="state"
                    >
                      <multiselect
                        v-model="value"
                        :options="options"
                        :multiple="true"
                        group-values="regions"
                        group-label="all"
                        :group-select="true"
                        placeholder="Type to search"
                        track-by="region"
                        label="label"
                        :state="state"
                        required
                      >
                        <!-- eslint-disable -->
                        <template
                          slot="selection"
                          slot-scope="{ values, search, isOpen }"
                          ><span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                            >{{ values.length }} options selected</span
                          ></template
                        >
                        <!-- eslint-enable -->
                      </multiselect>
                    </b-form-group>
                    <!-- <label class="typo__label">Simple select / dropdown</label> -->

                    <!-- <div
                    class="language-json"
                    v-for="(val, index) in value"
                    :key="val"
                  >
                    {{ val.region }}{{ index }}
                  </div> -->
                    <!-- <div>
                      <pre>{{ form }}</pre>
                    </div> -->

                    <!--  -->
                  </b-card-text>
                </b-card>
              </section>
              <section>
                <span class="fw-bold" style="display: inline"
                  >3. Import Summary</span
                >
                <span class="description" style="display: inline"
                  >Architecture to import</span
                >
                <b-card class="card" bg-variant="light">
                  <b-card-text class="card-text">
                    <b-form-group
                      label-cols="6"
                      label-cols-lg="4"
                      label-size="sm"
                      label="Architecture Name"
                      label-for="arch-name"
                      label-align="center"
                      :state="state"
                    >
                      <b-form-input
                        id="arch-name"
                        v-model="form.account_name"
                        placeholder="Enter Your Architecture Name"
                        size="sm"
                        :state="state"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-card-text>
                </b-card>
              </section>
            </div>
          </b-form>
        </b-modal>
        <!-- modal end -->

        <!-- loading modal start -->
        <b-modal
          id="modal-1"
          class="loadingModal"
          ref="sending-modal"
          no-close-on-backdrop
          hide-footer
          hide-header-close
          no-border
          v-model="loadingmodalShow"
          size="sm"
          centered
        >
        <div class="text-center">
          <b-spinner label="Loading..."></b-spinner>
        </div>
        </b-modal>

        <b-toast
          class="toast"
          id="sending-modal"
          variant=""
          solid
          no-auto-hide
          :visible="isProcessing"
        >
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
              <b-img
                blank
                blank-color="#ff5555"
                class="mr-2"
                width="12"
                height="12"
              ></b-img>
              <strong class="mr-auto">New Imported</strong>
              <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
            </div>
          </template>
          <div class="data-loading px-2 ">
            <div v-if="!ProcessingFinish" class="d-flex align-items-center">
              <div class="span-container mr-3">
                <span class="one"></span>
                <span class="two"></span>
                <span class="three"></span>
                <span class="four"></span>
              </div>
              <p>
                {{ archName }} is importing.<br />
                This process could take serveral minutes.
              </p>
            </div>
            <div v-else>
              <p class="text-center link">
                {{ archName }} has completed.<br />
                you can check your Architecture.
              </p>
              <!-- <b-button @click="openArch(postId)">here</b-button> -->
            </div>
          </div>
        </b-toast>
        <!-- loading modal end -->

        <!-- update madal -->
        <b-alert
         v-if="Isupdating"
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0 topAlert"
      style="z-index: 0; left: 60px"
      variant="warning"
      dismissible
    >
     <p >{{ updateName }} is updating ...</p> 
    </b-alert>
    <b-alert
    v-else
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0 topAlert"
      style="z-index: 0; left: 60px"
      variant="success"
      dismissible
    >
     <p>{{ updateName }} is updated !</p> 

    </b-alert>
        <!--  -->
      </div>

      <b-container fluid>
        <!-- User Interface controls -->
        <b-row class="justify-content-between mb-2">
          <b-col lg="4" class="my-1">
            <b-form-group class="mb-0">
              <b-input-group size="sm">
                <b-input-group-prepend is-text class="align-items-stretch">
                  <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                >
                </b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col sm="5" md="4" class="my-1">
            <b-row class="justify-content-end">
              <b-button
                variant="secondary"
                @click="fetchData()"
                size="sm"
                class="mr-3"
                ><b-icon icon="arrow-repeat" class="mr-1"></b-icon
              ></b-button>

              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
                varient="warning"
              ></b-pagination>
            </b-row>
          </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table
          :items="accountData"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          sort-by="timestamp"
          sort-desc="false"
          stacked="md"
          :busy="isBusy"
          show-empty
          @filtered="onFiltered"
        >
          <template #empty>
            <div class="text-center my-3">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
          </template>
          <template #table-busy>
            <div class="text-center my-3">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
          </template>
          <template #cell(actions)="row">
            <div class="d-flex align-items-center justify-content-evenly">
              <b-icon
                icon="arrow-repeat"
                class="repeat-icon"
                @click="updateArch(row.item, row.item.requestID)"
              ></b-icon>
              <b-icon
                icon="box-arrow-up-right"
                class="openArch-icon"
                @click="openArch(row.item)"
              ></b-icon>
              <b-icon
                icon="trash"
                class="delete-icon"
                @click="deleteArch(row.index, row.item.requestID, row.item.account_name)"
              ></b-icon>
              <!-- <b-icon
                icon="exclamation-circle"
                class="exclamation-circle"
                @click="showArchInfo(row.item)"
              ></b-icon> -->
            </div>
          </template>

          <!-- <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template> -->
        </b-table>
        <b-button class="console-link"
          ><a href="#"
            ><b-icon icon="bell"></b-icon></a
        ></b-button>
      </b-container>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import NavBar from "@/components/Sidebar.vue";
import axios from "axios";

export default {
  components: {
    Multiselect,
    "nav-bar": NavBar,
  },
  data() {
    return {
      loadingmodalShow: false,
      isProcessing: false,
      ProcessingFinish: false,
      archName: "",
      postId: "",
      updateName: "",
      Isupdating: false,
      showTop: false,
      marginTop: "0px",
      form: {
        user_id: "2345",
      },
      isBusy: true,
      accountData: [],
      fields: [
        {
          key: "account_name",
          label: "Architecture Name",
          sortable: true,
          stickyColumn: true,
          class: "text-center",
        },
        {
          key: "account_id",
          label: "Account ID",
          sortable: true,
          class: "text-center",
        },
        {
          key: "timestamp",
          label: "Last updated",
          sortable: true,
          class: "text-center",
        },
        { key: "actions", label: "" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 6,
      filter: null,
      //
      show: true,
      state: null,
      policy: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: [
              "ec2:DescribeInstances",
              "states:ListStateMachines",
              "states:DescribeStateMachine",
              "wafv2:GetWebACLForResource",
              "dynamodb:ListTables",
              "logs:DescribeLogStreams",
              "cognito-identity:ListIdentityPools",
              "wafv2:GetWebACL",
              "sns:ListTopics",
              "s3:ListBucket",
              "s3:GetBucketPolicy",
              "ec2:DescribeInternetGateways",
              "elasticloadbalancing:DescribeLoadBalancers",
              "logs:CreateLogStream",
              "ec2:DescribeNetworkInterfaces",
              "ec2:DescribeAvailabilityZones",
              "dynamodb:DescribeTable",
              "logs:GetLogEvents",
              "rds:DescribeDBInstances",
              "apigateway:GET",
              "ec2:DescribeNetworkAcls",
              "ec2:DescribeRouteTables",
              "wafv2:ListResourcesForWebACL",
              "s3:GetBucketPublicAccessBlock",
              "cognito-identity:DescribeIdentityPool",
              "cloudtrail:LookupEvents",
              "sqs:ListQueues",
              "logs:DescribeLogGroups",
              "sns:GetTopicAttributes",
              "lambda:ListFunctions",
              "dynamodb:Scan",
              "ecr:GetAuthorizationToken",
              "sqs:GetQueueAttributes",
              "dynamodb:Query",
              "ec2:DescribeSecurityGroups",
              "s3:GetObject",
              "s3:ListAllMyBuckets",
              "elasticloadbalancing:DescribeTargetHealth",
              "elasticloadbalancing:DescribeTargetGroups",
              "ec2:DescribeVpcEndpoints",
              "sts:GetCallerIdentity",
              "ec2:DescribeSubnets",
              "lambda:GetPolicy",
            ],
            Resource: ["*"],
          },
        ],
      },
      //
      value: [],
      options: [
        {
          all: "Select All",
          regions: [
            { region: "us-east-2", label: "us-east-2 (Ohio)" },
            { region: "us-west-2", label: "us-west-2 (Oregon)" },
            { region: "us-east-1", label: "us-east-1 (N.Virginia)" },
            { region: "us-west-1", label: "us-west-1 (N. California)" },
          ],
        },
      ],
    };
  },
  watch: {
    value: function () {
      const region = [];
      this.value.forEach(function (item) {
        region.push(item.region);
      });
      this.form.region = region;
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateArch(item, requestID) {
      this.updateName = item.account_name
      this.showTop = true
      this.marginTop = "35px"
      this.Isupdating = true
      console.log(item);
      axios
        .post("http://44.237.111.172/update", { requestID: requestID })
        .then((res) => {
          this.Isupdating = false
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openArch(item) {
      //開啟新視窗並傳參，引數不能顯示在位址列裡面，不關閉視窗一直重新整理，引數一直有效
      //主要實現開啟新視窗的功能
      const route = this.$router.resolve({
        name: "Arch",
      });
      const params = {
        requestID: item.requestID,
        archName: item.account_name,
      };
      //主要實現儲存引數的功能
      sessionStorage.setItem("item", JSON.stringify(params));
      window.open(route.href, "_blank");
    },
    deleteArch(index, requestID, account_name) {

      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete '+ account_name, {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value == true) {
              this.loadingmodalShow = true;
              this.delete(requestID)
            }
          })
          .catch(err => {
            // An error occurred
        })
    },
    delete(requestID) {
         try {
        // this.loading = true
        axios
          .delete(
            "https://hj47l47uptaqggfccy7jfoqqqy0apktb.lambda-url.us-west-2.on.aws/",
            { params: { requestid: requestID } }
          )
          .then((res) => {
            if (res.data.message == "Successfully deleted") {
              this.accountData.forEach((val, i) => {
                if (requestID == val.requestID) {
                  this.accountData.splice(i, 1);
                }
              })
              this.loadingmodalShow = false;
              console.log(requestID, res.data);
            } else {
              alert("Try again.");
            }
          })
          .catch((err) => {
            alert("Try again.");

            console.log(err);
          });
      } catch (e) {
        this.errors.push(e);
      }
    },
    // showArchInfo() {
    //   row.item
    // },
    checkFormValidity() {
      const valid = this.$refs.formValid.checkValidity();
      this.state = valid;
      return valid;
    },
    handleSubmit(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // this.form.Region = []
      this.form.user_id = "2345";
      console.log(this.form.region.length);
      // Trigger submit handler
      this.onSubmit();
    },
    resetModal() {
      this.form = {
        region: [],
        aws_session_token: "",
        user_id: "2345",
      };
      this.state = null;
    },
    onSubmit() {
      if (!this.checkFormValidity()) {
        return;
      } else if (this.form.region.length == 0) {
        alert("Please select region.");
        return;
      }
      console.log("bigloading", this.loadingmodalShow)
      this.archName = this.form.account_name;
      this.loadingmodalShow = true;
      setTimeout(() => {
      this.loadingmodalShow = false;
      this.isProcessing = true;
      }, 2000);
      console.log("bigloading", this.loadingmodalShow)
      console.log("sideloading", this.isProcessing)

      axios
        .post("http://44.237.111.172/newPost", this.form, {})
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
          this.postId = res.id;
          this.ProcessingFinish = true;
      console.log("finish", this.ProcessingFinish)

          this.fetchData();
          }
          
        })
        .catch((err) => {
          // alert("error")
          console.log(err);
        });
      // alert(JSON.stringify(this.form));
      // Hide the modal manually
      this.$nextTick(() => {
        this.value = [];
        this.$bvModal.hide("add-account");
      });
    },
    fetchData() {
      this.isBusy = true;
      const ddbURL =
        "https://esrcf3ow2g7pkghwqstdk3z4hy0egoay.lambda-url.us-west-2.on.aws/";
      const user = { user_id: this.form.user_id };
      try {
        // this.loading = true
        axios
          .get(ddbURL, { params: { user_id: this.form.user_id } })
          .then((res) => {
            this.accountData = JSON.parse(res.data.message);
            console.log("this.accountData", this.accountData)
            // Set the initial number of items
            this.totalRows = this.accountData.length;
            this.isBusy = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.about {
  width: 100%;
  .container {
    padding: 20px 16px;
  }
}

.link a {
  text-decoration: underline;
  color: #ecb300;
  color: #b863f0;

}

.org-description {
  margin-top: 50px;
}

.loadingModal .modal-content {
  width: 50px;
    border: 0;
    background: "#fff0";
    .modal-header {
      border: 0;
    }
  }

hr {
  border: 1px solid #e5e5e557;
  border-radius: 5px;
}

.text-primary {
  color: #202020 !important;
}

.alert {
  padding: 0.75rem 1.25rem;
p {
  margin: 0;
}
}
.b-toaster.b-toaster-top-right {
  top: 50px
}

.console-link {
  position: fixed;
  right: 10px;
  bottom: 20px;
  border: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #db9a47;
  .b-icon {
    font-size: 18px;
    vertical-align: text-top;
    color: #fff;
  }
  &:hover {
    background: #3c4547;
  }
}

.description {
  font-size: 14px;
  color: #5e5e5e;
  margin-left: 8px;
}

.content {
  padding: 0 8px;
  width: 50%;
  span {
    display: block;
  }
}

.card {
  width: 95%;
  margin: 8px;
  .card-text .textarea {
    min-height: 200px;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 0.8rem;
    color: #333;
    line-height: 1.2;
    overflow-y: scroll;
    resize: none;
  }
}

.container .table td .b-icon {
  margin: 0 8px;
  font-size: 20px;
  &.openArch-icon {
    font-size: 18px;
  }
}

section .card-body {
  padding: 1rem 1.25rem 0;

}

.toast {
  z-index: 1;
}


</style>
