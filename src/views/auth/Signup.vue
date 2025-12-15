<template>
  <div>
    <PageHeader :logo="route.meta.logo as string" :title="route.meta.title as string" />
    
    <div class="auth-wrapper" :style="{ left: sidebarLeft }">
      <div class="auth-card-centered">
        <div class="auth-content-scroll">
          <div class="logo-container">
            <img src="@/assets/images/logo.png" alt="KFLIX Logo" class="logo-image" />
            <span class="logo-admin-text">APP</span>
          </div>

          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join KFLIX - Stream Worldwide</p>

          <div class="auth-form">
            <!-- Username -->
            <div class="input-group">
              <label for="username" class="input-label">Username *</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  placeholder="johndoe"
                  class="auth-input"
                />
              </div>
            </div>

            <!-- Display Name -->
            <div class="input-group">
              <label for="displayName" class="input-label">Display Name (Optional)</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <input
                  id="displayName"
                  v-model="formData.displayName"
                  type="text"
                  placeholder="John Doe"
                  class="auth-input"
                />
              </div>
            </div>

            <!-- Email -->
            <div class="input-group">
              <label for="email" class="input-label">Email Address *</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="you@example.com"
                  class="auth-input"
                />
              </div>
            </div>

            <!-- Phone Number with Country Code -->
            <div class="input-group">
              <label class="input-label">Phone Number *</label>
              <div class="phone-row">
                <!-- Country Code Dropdown Button -->
                <div class="country-select-wrapper">
                  <button
                    type="button"
                    class="country-select country-select-button"
                    @click="toggleDropdown"
                  >
                    <span class="country-select-flag">{{ selectedCountry.flag }}</span>
                    <span class="country-select-code">{{ selectedCountry.code }}</span>
                    <svg class="country-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <!-- Dropdown Panel -->
                  <div v-if="showDropdown" class="country-dropdown">
                    <div class="country-search">
                      <svg class="country-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search country..."
                        class="country-search-input"
                        autofocus
                      />
                    </div>

                    <div class="country-list">
                      <button
                        v-for="country in filteredCountries"
                        :key="country.code + country.country"
                        type="button"
                        class="country-option"
                        :class="{ 'country-option--active': formData.countryCode === country.code }"
                        @click="selectCountry(country)"
                      >
                        <span class="country-option-flag">{{ country.flag }}</span>
                        <span class="country-option-name">{{ country.name }}</span>
                        <span class="country-option-code">{{ country.code }}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Phone Input -->
                <div class="input-wrapper phone-input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <input
                    id="phoneNumber"
                    v-model="formData.phoneNumber"
                    type="tel"
                    placeholder="712345678"
                    class="auth-input phone-input"
                  />
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="input-group">
              <label for="password" class="input-label">Password *</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="auth-input"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="input-group">
              <label for="confirmPassword" class="input-label">Confirm Password *</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="auth-input"
                  @keyup.enter="handleSignUp"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <svg v-if="showConfirmPassword" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit -->
            <button class="auth-button primary-button" @click="handleSignUp">
              <span>Create Account</span>
              <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          <div class="auth-footer">
            <p class="footer-text">
              Already have an account?
              <button class="link-button" @click="goToLogin">Sign In</button>
            </p>
          </div>
        </div>

        <!-- Overlay for closing country dropdown on outside click -->
        <div
          v-if="showDropdown"
          class="country-dropdown-overlay"
          @click="closeDropdown"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/layout/PageHeader.vue'

interface SignupFormData {
  username: string
  displayName: string
  email: string
  countryCode: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface CountryOption {
  code: string
  country: string
  flag: string
  name: string
}

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const sidebarLeft = computed(() => {
  return appStore.sidebarCollapsed ? '80px' : '260px'
})

const countryOptions: CountryOption[] = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸', name: 'United States/Canada' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda' },
  { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
  { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
  { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
  { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
  { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
  { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland' },
  { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
  { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
  { code: '+98', country: 'IR', flag: '🇮🇷', name: 'Iran' },
  { code: '+964', country: 'IQ', flag: '🇮🇶', name: 'Iraq' },
  { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel' },
  { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru' },
  { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' }
]

const formData = ref<SignupFormData>({
  username: '',
  displayName: '',
  email: '',
  countryCode: '+256',
  phoneNumber: '',
  password: '',
  confirmPassword: ''
})

const showDropdown = ref(false)
const searchQuery = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const filteredCountries = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return countryOptions

  return countryOptions.filter((country) => {
    return (
      country.name.toLowerCase().includes(query) ||
      country.code.includes(searchQuery.value) ||
      country.country.toLowerCase().includes(query)
    )
  })
})

const selectedCountry = computed(() => {
  return (
    countryOptions.find((c) => c.code === formData.value.countryCode) || countryOptions[0]
  )
})

const toggleDropdown = (): void => {
  showDropdown.value = !showDropdown.value
}

const selectCountry = (country: CountryOption): void => {
  formData.value.countryCode = country.code
  showDropdown.value = false
  searchQuery.value = ''
}

const closeDropdown = (): void => {
  showDropdown.value = false
  searchQuery.value = ''
}

const handleSignUp = (): void => {
  if (
    !formData.value.username ||
    !formData.value.email ||
    !formData.value.password ||
    !formData.value.confirmPassword ||
    !formData.value.phoneNumber
  ) {
    alert('Please fill in all required fields')
    return
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  const registrationData = {
    username: formData.value.username,
    email: formData.value.email,
    password: formData.value.password,
    phoneNumber: formData.value.countryCode + formData.value.phoneNumber,
    display_name: formData.value.displayName || formData.value.username,
    country_code: formData.value.countryCode
  }

  console.log('Registration data:', registrationData)
  // Add your signup logic here
  router.push('/') // Redirect to dashboard (HomePage) after successful signup
}

const goToLogin = (): void => {
  router.push('/auth/login')
}
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>
<style scoped>
/* Fix for auth-title visibility */
.auth-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  text-align: center !important;
  margin-bottom: 8px !important;
  background: linear-gradient(135deg, #2196F3, #00BFA5) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  display: block !important;
  line-height: 1.2 !important;
}

/* Fallback for browsers that don't support background-clip */
@supports not (-webkit-background-clip: text) {
  .auth-title {
    color: #2196F3 !important;
    -webkit-text-fill-color: initial !important;
  }
}

/* Password Toggle Button */
.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.eye-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.password-toggle:hover .eye-icon {
  color: var(--kflix-blue);
}
</style>