<template>
  <div class="flex flex-col items-center justify-center w-full h-full mx-auto">
    <div
      class="w-full max-w-md p-10 space-y-6 bg-white border border-gray-200 rounded-xl"
    >
      <h1
        class="mb-10 text-2xl font-medium tracking-wider text-center text-gray-900"
      >
        User Login
      </h1>
      <Input
        v-model="form.email"
        label="Email"
        placeholder="Enter your email"
      />
      <Input
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <div class="ml-auto text-right">
        <Button
          color="purple"
          size="lg"
          :disabled="!(form.email && form.password)"
          class="tracking-wider"
          @click="handleLogin"
        >
          Login
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
import { reactive } from 'vue';
import Input from '../components/form/input.vue';

const form = reactive({ email: '', password: '' });
const router = useRouter();

const auth = useFirebaseAuth();
const user = useCurrentUser();

// watch(user, (val) => {
//   if (val?.email) {
//     router.push('/');
//   } else if (!val?.email) {
//     router.push('/login');
//   }
// });

const handleLogin = async () => {
  try {
    const accessToken = useCookie('accessToken');
    await signInWithEmailAndPassword(auth as Auth, form.email, form.password);
    const tokenId = await auth?.currentUser?.getIdToken();
    accessToken.value = tokenId;
    if (tokenId) {
      router.push('/');
    }
  } catch (error: any) {
    if (
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/invalid-credential'
    ) {
      console.log('Invalid credentials');
    } else {
      console.log('Error occured');
    }
    console.log(error, 'Login - Error');
  }
};
</script>
