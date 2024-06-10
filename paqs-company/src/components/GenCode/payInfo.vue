<template>
  <q-form @submit.prevent.stop="payStep">
    <div>
      <!-- <a href="https://front.codes/" class="logo" target="_blank">
              <img src="https://assets.codepen.io/1462889/fcy.png" alt="">
            </a> -->

      <div class="section">
        <div class="container">
          <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 class="mb-0 pb-3">
                  <span>Credit Card </span><span>Mobile Money</span>
                </h6>
                <input
                  id="reg-log"
                  class="checkbox"
                  type="checkbox"
                  name="reg-log"
                >
                <label for="reg-log" />
                <div class="card-3d-wrap mx-auto">
                  <div class="card-3d-wrapper">
                    <div class="card-front">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="pb-3">
                            Visa / Mastercard / PayPal
                          </h4>
                          <div
                            class="flex flex-end"
                            style=" width: 42px; height: 30px;
                        margin-left: 10px; margin-left: 45%;
                        flex-direction: column-reverse;
                        margin-bottom: 10px;"
                          >
                            <img
                              style="padding-right: 10px"
                              src="../../assets/img/svg/visa.svg"
                              alt="visa"
                            >
                            <img
                              style="padding-right: 10px"
                              src="../../assets/img/svg/mastercard.svg"
                              alt="mastercard"
                            >
                            <img
                              style="padding-right: 10px"
                              src="../../assets/img/svg/paypal.svg"
                              alt="maestro"
                            >
                          </div>
                          <div class="form-group">
                            <q-input
                              ref="namefull"
                              v-model="prods.payInfo.fullname"
                              outlined
                              color="purple-12"
                              type="text"
                              label="Full Name"
                              :rules="fullNameRules"
                            >
                              <template #prepend>
                                <q-icon name="person" />
                              </template>
                            </q-input>
                            <span
                              v-if="!v$.fullname?.$pending && !v$.fullname?.$error"
                              class="flex flex-col text-red-500"
                            >
                              {{ fullNameError }}
                            </span>
                          </div>
                          <div class="form-group mt-2">
                            <q-input
                              v-model="prods.payInfo.cardNumber"
                              outlined
                              color="purple-12"
                              type="text"
                              label="Card Number"
                              :rules="cardNumberRules"
                            >
                              <template #prepend>
                                <q-icon name="pin" />
                              </template>
                            </q-input>
                          </div>
                          <span
                            v-if="!v$.cardNumber?.$pending && !v$.cardNumber?.$error"
                            class="flex flex-col text-red-500"
                          >
                            {{ cardNumberError }}
                          </span>
                          <div class="form-group mt-2">
                            <q-select
                              ref="cardd"
                              v-model="prods.payInfo.cardType"
                              :options="prods.payInfo.typeCard"
                              outlined
                              color="purple-12"
                              type="text"
                              label="Card Type"
                            >
                              <template #prepend>
                                <q-icon name="credit_card" />
                              </template>
                            </q-select>
                          </div>
                          <div class="flex flex-wrap ml-4">
                            <div class="w-full lg:w-6/12 px-4">
                              <div class="relative w-full mb-3">
                                <label
                                  for="expiry-date"
                                  class="mr-4 "
                                  style="float: left"
                                >Expiry</label>
                                <div style="float: left; display: flex; flex-direction: row">
                                  <q-select
                                    v-model="prods.payInfo.monthExp"
                                    outlined
                                    :options="prods.payInfo.expMonth"
                                    class="ml-2"
                                  />
                                  <q-select
                                    v-model="prods.payInfo.yearExp"
                                    outlined
                                    :options="prods.payInfo.expYear"
                                    class="ml-2"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                              <div class="relative w-full mb-3">
                                <div style="float: left">
                                  <q-input
                                    v-model="prods.payInfo.cvv"
                                    outlined
                                    color="purple-12"
                                    type="number"
                                    label="CVV"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <q-field
                              class="ml-4 mt-4"
                              color="grey-3"
                              outlined
                              label="Total"
                              stack-label
                            >
                              <template #prepend>
                                <q-icon name="account_balance_wallet" />
                              </template>
                              <template #append>
                                <q-icon name="attach_money" />
                              </template>
                              <template #control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >
                                  {{ prods.totals }}
                                </div>
                              </template>
                            </q-field>
                          </div>
                          <!-- <a href="#" class="btn mt-4">submit</a> -->
                        </div>
                      </div>
                    </div>
                    <div class="card-back">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="pb-3">
                            Mobile Money
                          </h4>
                          <div
                            class="flex flex-end"
                            style=" width: 42px; height: 30px;
                                  margin-left: 10px; margin-left: 46%;
                                  flex-direction: column-reverse;
                                  margin-bottom: 10px;"
                          >
                            <img
                              src="../../assets/img/svg/mtn.svg"
                              style="margin-right: 2px"
                              alt="mtn"
                            >
                            <img
                              src="../../assets/img/svg/vodafone.svg"
                              style="margin-right: 2px"
                              alt="voda"
                            >
                          </div>
                          <div class="form-group">
                            <q-input
                              ref="namefull"
                              v-model="prods.payInfo.fullname"
                              outlined
                              color="purple-12"
                              type="text"
                              label="Full Name"
                            >
                              <template #prepend>
                                <q-icon name="person" />
                              </template>
                            </q-input>
                            <span
                              v-if="!v$.fullname?.$pending && !v$.fullname?.$error"
                              class="flex flex-col text-red-500"
                            >
                              {{ fullNameError }}
                            </span>
                          </div>
                          <div class="form-group mt-2">
                            <q-input
                              v-model="prods.payInfo.phoneNumber"
                              outlined
                              color="purple-12"
                              type="tel"
                              label="Phone Number"
                              :rules="phoneNumberRules"
                            >
                              <template #prepend>
                                <q-icon name="phone_iphone" />
                              </template>
                            </q-input>
                          </div>
                          <span
                            v-if="!v$.phoneNumber?.$pending && !v$.phoneNumber?.$error"
                            class="flex flex-col text-red-500"
                          >
                            {{ phoneNumberError }}
                          </span>
                          <div class="flex flex-wrap ml-4">
                            <div class="w-full lg:w-6/12 px-4">
                              <div class="relative w-full mb-3">
                                <label
                                  for="expiry-date"
                                  class="mr-4 mt-4 "
                                  style="float: left"
                                >Service
                                  Provider</label>
                                <div style="float: left">
                                  <q-select
                                    ref="provServ"
                                    v-model="prods.payInfo.provider"
                                    outlined
                                    :options="prods.payInfo.servProv"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <q-field
                              class="ml-4 mt-4"
                              color="grey-3"
                              outlined
                              label="Total"
                              stack-label
                            >
                              <template #prepend>
                                <q-icon name="account_balance_wallet" />
                              </template>
                              <template #append>
                                <q-icon name="attach_money" />
                              </template>
                              <template #control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >
                                  {{ prods.totals }}
                                </div>
                              </template>
                            </q-field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
import {
  ref, defineComponent, computed,
} from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
} from '@vuelidate/validators';
import { useProdStore } from '../../stores/prods';

export default defineComponent({
  emits: ['pay-step'],
  setup({ emit }) {
    const step = ref(2);
    const prods = useProdStore();
    const v$ = useVuelidate(
      {
        fullname: { required, minLength: minLength(3), maxLength: maxLength(50) },
        cardNumber: { required, minLength: minLength(3), maxLength: maxLength(15) },
        phoneNumber: { required, minLength: minLength(3), maxLength: maxLength(10) },
      },
      prods.payInfo,
    );
    const fullNameError = computed(() => (v$?.fullname?.$pending ? '' : v$?.fullname?.$error));
    const cardNumberError = computed(() => {
      if (prods.payInfo.cardNumber.length > 5 && prods.payInfo.yearExp.length > 2) {
        return v$?.cardNumber?.$pending ? '' : v$?.cardNumber?.$error;
      }
      return '';
    });

    const cardNumberRules = computed(() => {
      if (prods.payInfo.cardNumber.length > 5 && prods.payInfo.yearExp.length > 2) {
        return [
          () => !v$?.cardNumber?.required || 'Card number is required.',
          () => !v$?.cardNumber?.minLength || 'Card number must be at least 3 characters long.',
          () => !v$?.cardNumber?.maxLength || 'Card number must be at most 15 characters long.',
        ];
      }
      return [];
    });
    const phoneNumberError = computed(() => {
      if (prods.payInfo.phoneNumber.length > 5 && prods.payInfo.yearExp.length > 2) {
        return v$?.phoneNumber?.$pending ? '' : v$?.phoneNumber?.$error;
      }
      return '';
    });

    const phoneNumberRules = computed(() => {
      if (prods.payInfo.phoneNumber.length > 4 && prods.payInfo.provider.length > 2) {
        return [
          () => !v$?.phoneNumber?.required || 'Card number is required.',
          () => !v$?.phoneNumber?.minLength || 'Card number must be at least 3 characters long.',
          () => !v$?.phoneNumber?.maxLength || 'Card number must be at most 15 characters long.',
        ];
      }
      return [];
    });

    const fullNameRules = computed(() => [
      () => !v$?.fullname?.required || 'Name of the product is required.',
      () => !v$?.fullname?.minLength || 'Name must be at least 3 characters long.',
      () => !v$?.fullname?.maxLength || 'Name must be at most 50 characters long.',
    ]);
    const payStep = () => {
      if (!v$.$pending && !v$.$error) {
        emit('next-step', 3);
      }
    };

    return {
      fullNameError,
      fullNameRules,
      cardNumberError,
      cardNumberRules,
      phoneNumberError,
      phoneNumberRules,
      step,
      prods,
      v$,
      payStep,
    };
  },
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

a {
  cursor: pointer;
  transition: all 200ms linear;
}

a:hover {
  text-decoration: none;
}

.link {
  color: #c4c3ca;
}

.link:hover {
  color: #ffeba7;
}

p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}

h4 {
  font-weight: 600;
}

h6 span {
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}

.section {
  position: relative;
  width: 99%;
  display: block;
}

.full-height {
  min-height: 100vh;
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: absolute;
  left: -9999px;
}

.checkbox:checked+label,
.checkbox:not(:checked)+label {
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}

.checkbox:checked+label:before,
.checkbox:not(:checked)+label:before {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #102770;
  font-family: 'unicons';
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}

.checkbox:checked+label:before {
  transform: translateX(44px) rotate(-270deg);
}

.card-3d-wrap {
  position: relative;
  /* width: 350vh; */
  width: 100%;
  max-width: 100%;
  height: 650px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 15px;
}

.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  background-color: #fbfbfd;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  border-bottom-color: #102770;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.checkbox:checked~.card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}

.center-wrap {
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 45%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}

.form-group {
  position: relative;
  display: block;
  margin: 25px;
  padding: 0;
}

/* .form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
} */
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
}

.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

/* .form-group input:-ms-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
} */

.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255, 235, 167, .2);
}

.btn:active,
.btn:focus {
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, .2);
}

.btn:hover {
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, .2);
}

.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}

.logo img {
  height: 26px;
  width: auto;
  display: block;
}
</style>
