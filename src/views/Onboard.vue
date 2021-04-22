<template>
  <LayoutDefault>
    <div class="max-w-7xl h-full">
      <header
        class="sm:absolute max-w-7xl w-full flex justify-center space-between px-4 sm:px-6 pt-6 sm:pt-6"
      >
        <p
          to="/onboarding
        "
          class="overflow- text-xs leading-6 text-gray-600 py-2 sm:hidden"
        >
          {{ $t('locale.onboardScreen.firstPage') }}
        </p>
        <router-link class="hidden sm:block" to="/onboarding">
          <img height="40" width="210" class="mx-auto h-10 w-auto" src="/logo.svg" alt="MatchMeMD"
        /></router-link>
        <img
          height="40"
          width="210"
          class="mx-auto h-9 w-auto cursor-pointer sm:invisible"
          src="/matchmemd-icon.svg"
          alt="MatchMeMD"
        />
        <p
          class="py-2 matchmemd-text-link font-normal sm:text-lg"
          @click="onFinishOnboarding(true)"
        >
          {{ $t('locale.onboardScreen.skip') }}
        </p>
      </header>
      <div class="sm:grid sm:grid-rows-3 sm:grid-cols-12 sm:gap-4 sm:h-full">
        <section
          class="sm:col-span-4 pt-8 sm:pt-0 sm:px-6 space-y-4 flex flex-col justify-center items-center sm:items-start sm:justify-start sm:bg-gray-200 sm:h-screen"
        >
          <div class="sm:mt-56 space-y-4">
            <h1
              class="text-2xl sm:text-4xl text-center sm:text-left leading-8 font-bold text-gray-700"
            >
              <p class="text-lg sm:text-xl leading-10 font-normal sm:mb-2">
                {{
                  !isPageTwo
                    ? `${$t('locale.onboardScreen.welcome')} ${userProfile.firstName}!`
                    : $t('locale.onboardScreen.upNext')
                }}
              </p>
              <p>
                {{
                  !isPageTwo
                    ? $t('locale.onboardScreen.completeProfile')
                    : $t('locale.onboardScreen.completeProfileTwo')
                }}
              </p>
            </h1>

            <p
              class="text-center sm:text-left sm:text-lg text-gray-600 text-lg leading-6 px-2 sm:px-0"
            >
              {{
                !isPageTwo
                  ? $t('locale.onboardScreen.completeProfileDetailsOne')
                  : $t('locale.onboardScreen.completeProfileDetailsTwo')
              }}
            </p>
          </div>

          <OnboardingStepper
            :isPageTwo="isPageTwo"
            v-on:stepperChanged="onStepperChange"
            class="hidden sm:block pt-8"
          />
        </section>

        <main class="sm:col-span-8 sm:row-span-3 mt-1 px-4 sm:mt-56" v-if="!isPageTwo">
          <div class="">
            <div class="w-full align-center flex justify-center py-6">
              <input
                class="hidden"
                type="file"
                id="profilePicture"
                name="profilePicture"
                @change="previewFiles"
                accept="image/*"
              />
              <label for="profilePicture">
                <div
                  class="flex sm:space-y-1.5 flex-col justify-center items-center cursor-pointer"
                  v-show="previewedPhoto.file"
                >
                  <div class="inline-block relative">
                    <img
                      ref="profilePictureRef"
                      class="h-16 w-16 sm:h-24 sm:w-24 rounded-full"
                      :src="previewedPhoto.dataURL"
                    />
                    <span
                      class="absolute -top-2 sm:-top-3 right-0 block h-7 w-7 sm:h-10 sm:w-10 rounded-full"
                    >
                      <CameraSVG />
                    </span>
                  </div>

                  <p class="leading-6 text-gray-600 sm:text-gray-500 sm:text-base">
                    {{ previewedPhoto?.file?.name || $t('locale.onboardScreen.addPhoto') }}
                  </p>
                </div>
                <div
                  class="flex sm:space-y-1.5 flex-col justify-center items-center cursor-pointer"
                  v-show="!previewedPhoto.file"
                >
                  <span class="inline-block relative">
                    <span
                      class="inline-flex items-center justify-center h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-gray-500"
                    >
                      <span class="text-xl font-medium leading-none text-pacific-50">{{
                        initials
                      }}</span>
                    </span>
                    <span
                      class="absolute -top-2 right-0 block h-7 w-7 sm:h-10 sm:w-10 sm:-top-3 rounded-full"
                    >
                      <CameraSVG />
                    </span>
                  </span>
                  <p class="leading-6 sm:text-base text-gray-600 sm:text-gray-500">
                    {{ $t('locale.onboardScreen.addPhoto') }}
                  </p>
                </div>
              </label>
            </div>
            <form class="space-y- pt-2 max-w-md m-auto" @submit.prevent="onSubmit">
              <div class="space-y-4 sm:space-y-6 pt-2">
                <div class="space-y-3">
                  <MatchMeMDSelect
                    inputKey="location"
                    v-on:optionChanged="onCountryChange"
                    :defaultSelectedOption="
                      country || $t('locale.onboardScreen.defaultSelectedCountryOption')
                    "
                    :label="$t('locale.onboardScreen.inputLabels.location')"
                  />
                  <MatchMeMDDatePicker
                    v-on:dateChanged="onDateOfBirthChange"
                    :label="$t('locale.onboardScreen.inputLabels.birthday')"
                    :defaultSelectedOption="$t('locale.onboardScreen.defaultSelectedCountryOption')"
                  />
                </div>
                <div>
                  <div role="group" aria-labelledby="label-gender">
                    <div class="">
                      <div>
                        <div
                          class="block font-medium text-gray-700 sm:text-lg sm:font-semibold"
                          id=""
                        >
                          {{ $t('locale.onboardScreen.inputLabels.gender.title') }}
                        </div>
                      </div>

                      <div>
                        <div class="max-w-lg">
                          <div class="mt-2 space-y-4">
                            <div class="flex items-center">
                              <input
                                id="gender_male"
                                name="gender"
                                @change="onGenderChange"
                                v-model="gender"
                                value="male"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="gender_male"
                                :class="[gender === 'male' ? 'sm:font-medium' : 'sm:font-normal']"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{ $t('locale.onboardScreen.inputLabels.gender.male') }}
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                v-model="gender"
                                id="gender_female"
                                @change="onGenderChange"
                                name="gender"
                                value="female"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="gender_female"
                                :class="[gender === 'female' ? 'sm:font-medium' : 'sm:font-normal']"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{ $t('locale.onboardScreen.inputLabels.gender.female') }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="py-6">
                  <button @click.prevent="nextPage" class="matchmemd-button w-full">
                    <div>{{ $t('locale.onboardScreen.nextButton') }}</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>

        <main
          class="overflow-y-scroll sm:col-span-8 sm:row-span-3 mt-8 px-4 sm:mt-56 bg-gray-100 sm:bg-transparent rounded-t-3xl sm:pb-36"
          v-else
        >
          <div class="">
            <form class="pt-2 max-w-md m-auto" @submit.prevent="onSubmit">
              <div class="space-y-6 sm:space-y-8 pt-2">
                <div>
                  <label class="matchmemd-input-label pb-1.5" for="school">{{
                    $t('locale.onboardScreen.inputLabels.school.attend')
                  }}</label>
                  <input
                    name="school"
                    type="text"
                    id="school"
                    :placeholder="$t('locale.onboardScreen.inputLabels.school.schoolName')"
                    v-model.trim="school"
                    @change="onSchoolChange"
                    maxlength="40"
                    class="matchmemd-input w-full"
                  />
                </div>
                <div>
                  <div role="group" aria-labelledby="label-medical-status">
                    <div class="">
                      <div>
                        <div class="matchmemd-input-label" id="">
                          {{ $t('locale.onboardScreen.inputLabels.educationalStatus.title') }}
                        </div>
                      </div>

                      <div>
                        <div class="max-w-lg">
                          <div class="mt-2 space-y-4">
                            <div class="flex items-center">
                              <input
                                id="medicalStudent"
                                @change="onMedicalStatusChange"
                                name="medicalStatus"
                                v-model="medicalStatus"
                                value="Medical student"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="medicalStudent"
                                :class="[
                                  medicalStatus === 'Medical student'
                                    ? 'sm:font-medium'
                                    : 'sm:font-normal'
                                ]"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{
                                  $t(
                                    'locale.onboardScreen.inputLabels.educationalStatus.medicalStudent'
                                  )
                                }}
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                id="medicalGraduate"
                                @change="onMedicalStatusChange"
                                value="Medical graduate"
                                name="medicalStatus"
                                v-model="medicalStatus"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="medicalGraduate"
                                :class="[
                                  medicalStatus === 'Medical graduate'
                                    ? 'sm:font-medium'
                                    : 'sm:font-normal'
                                ]"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{
                                  $t(
                                    'locale.onboardScreen.inputLabels.educationalStatus.medicalGraduate'
                                  )
                                }}
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                id="nursingStudent"
                                @change="onMedicalStatusChange"
                                value="Nursing student"
                                name="medicalStatus"
                                v-model="medicalStatus"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="nursingStudent"
                                :class="[
                                  medicalStatus === 'Nursing student'
                                    ? 'sm:font-medium'
                                    : 'sm:font-normal'
                                ]"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{
                                  $t(
                                    'locale.onboardScreen.inputLabels.educationalStatus.nursingStudent'
                                  )
                                }}
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                id="nursePractitioner"
                                @change="onMedicalStatusChange"
                                value="Nurse practitioner"
                                name="medicalStatus"
                                v-model="medicalStatus"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="nursePractitioner"
                                :class="[
                                  medicalStatus === 'Nurse practitioner'
                                    ? 'sm:font-medium'
                                    : 'sm:font-normal'
                                ]"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{
                                  $t(
                                    'locale.onboardScreen.inputLabels.educationalStatus.nursePractitioner'
                                  )
                                }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div role="group" aria-labelledby="label-clinical-interest">
                    <div class="">
                      <div>
                        <div class="matchmemd-input-label" id="">
                          {{
                            $t('locale.onboardScreen.inputLabels.hasClinicalInterest.interested')
                          }}
                        </div>
                      </div>

                      <div>
                        <div class="max-w-lg">
                          <div class="mt-2 space-y-4">
                            <div class="flex items-center">
                              <input
                                id="interestYes"
                                @change="onHasClinicalInterestChange"
                                name="hasClinicalInterest"
                                v-model="hasClinicalInterest"
                                :value="true"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="interestYes"
                                :class="[
                                  hasClinicalInterest === 'yes'
                                    ? 'sm:font-medium'
                                    : 'sm:font-normal'
                                ]"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{ $t('locale.onboardScreen.inputLabels.hasClinicalInterest.yes') }}
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                id="interestNo"
                                @change="onHasClinicalInterestChange"
                                :value="false"
                                name="hasClinicalInterest"
                                v-model="hasClinicalInterest"
                                type="radio"
                                class="matchmemd-radio"
                              />
                              <label
                                for="interestNo"
                                :class="[
                                  hasClinicalInterest === 'no' ? 'sm:font-medium' : 'sm:font-normal'
                                ]"
                                class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                              >
                                {{ $t('locale.onboardScreen.inputLabels.hasClinicalInterest.no') }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <transition
                  enter-active-class="transition ease-in duration-200"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-in duration-250"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <div v-show="hasClinicalInterest" class="space-y-6 sm:space-y-8">
                    <div>
                      <div role="group" aria-labelledby="label-clinicals">
                        <div class="">
                          <div>
                            <div class="matchmemd-input-label" id="">
                              {{ $t('locale.onboardScreen.inputLabels.clinical.title') }}
                            </div>
                          </div>
                          <div>
                            <div class="max-w-lg">
                              <div class="mt-2 space-y-4">
                                <div class="flex items-center">
                                  <input
                                    id="core-rotation"
                                    @change="onClinicalChange"
                                    name="clinical"
                                    v-model="clinical"
                                    value="core"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="core-rotation"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.clinical.core') }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="elective-rotation"
                                    @change="onClinicalChange"
                                    name="clinical"
                                    v-model="clinical"
                                    value="elective"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="elective-rotation"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.clinical.elective') }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="observership"
                                    @change="onClinicalChange"
                                    name="clinical"
                                    v-model="clinical"
                                    value="observership"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="observership"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.clinical.observership')
                                    }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div role="group" aria-labelledby="label-start-date">
                        <div class="">
                          <div>
                            <div class="matchmemd-input-label" id="">
                              {{ $t('locale.onboardScreen.inputLabels.startDate.title') }}
                            </div>
                          </div>
                          <div>
                            <div class="max-w-lg">
                              <div class="mt-2 space-y-4">
                                <div class="flex items-center">
                                  <input
                                    id="start-early"
                                    @change="onStartDateChange"
                                    name="startDate"
                                    v-model="startDate"
                                    value="early"
                                    type="radio"
                                    class="matchmemd-radio"
                                  />
                                  <label
                                    for="start-early"
                                    :class="[
                                      startDate === 'early' ? 'sm:font-medium' : 'sm:font-normal'
                                    ]"
                                    class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.startDate.early') }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="start-medium"
                                    @change="onStartDateChange"
                                    name="startDate"
                                    v-model="startDate"
                                    value="medium"
                                    type="radio"
                                    class="matchmemd-radio"
                                  />
                                  <label
                                    for="start-medium"
                                    :class="[
                                      startDate === 'medium' ? 'sm:font-medium' : 'sm:font-normal'
                                    ]"
                                    class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.startDate.medium') }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="start-late"
                                    @change="onStartDateChange"
                                    name="startDate"
                                    v-model="startDate"
                                    value="late"
                                    type="radio"
                                    class="matchmemd-radio"
                                  />
                                  <label
                                    for="start-late"
                                    :class="[
                                      startDate === 'late' ? 'sm:font-medium' : 'sm:font-normal'
                                    ]"
                                    class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.startDate.late') }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="start-veryLate"
                                    @change="onStartDateChange"
                                    name="startDate"
                                    v-model="startDate"
                                    value="veryLate"
                                    type="radio"
                                    class="matchmemd-radio"
                                  />
                                  <label
                                    for="start-veryLate"
                                    :class="[
                                      startDate === 'veryLate' ? 'sm:font-medium' : 'sm:font-normal'
                                    ]"
                                    class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.startDate.veryLate') }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div role="group" aria-labelledby="specialties">
                        <div class="">
                          <div>
                            <div class="matchmemd-input-label" id="">
                              {{ $t('locale.onboardScreen.inputLabels.specialties.title') }}
                            </div>
                          </div>
                          <div>
                            <div class="max-w-lg">
                              <div class="mt-2 space-y-2">
                                <div class="flex flex-row space-x-1.5">
                                  <div
                                    @click="onSpecialtiesAction('add')"
                                    class="cursor-pointer hover:text-pacific-700 text-pacific-600"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.selectAll')
                                    }}
                                  </div>
                                  <p class="text-pacific-600">|</p>
                                  <div
                                    @click="onSpecialtiesAction('remove')"
                                    class="cursor-pointer hover:text-pacific-700 text-pacific-600"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.removeAll')
                                    }}
                                  </div>
                                </div>

                                <div class="flex items-center">
                                  <input
                                    id="anesthesiology"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="anesthesiology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="anesthesiology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.anesthesiology'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="cardiology"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="cardiology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="cardiology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.cardiology')
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="dermatology"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="dermatology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="dermatology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.dermatology')
                                    }}
                                  </label>
                                </div>

                                <div class="flex items-center">
                                  <input
                                    id="emergencyMedicine"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="emergencyMedicine"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="emergencyMedicine"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.emergencyMedicine'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="endocrinology"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="endocrinology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="endocrinology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.endocrinology'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="familyMedicine"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="familyMedicine"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="familyMedicine"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.familyMedicine'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="gastroenterology"
                                    @change="onSpecialtiesChange"
                                    name="specialties"
                                    v-model="specialties"
                                    value="gastroenterology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="gastroenterology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.gastroenterology'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="geriatricMedicine"
                                    @change="onSpecialtiesChange"
                                    name="geriatricMedicine"
                                    v-model="specialties"
                                    value="geriatricMedicine"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="geriatricMedicine"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.geriatricMedicine'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="hematologyOncology"
                                    @change="onSpecialtiesChange"
                                    name="hematologyOncology"
                                    v-model="specialties"
                                    value="hematologyOncology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="hematologyOncology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.hematologyOncology'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="infectiousDisease"
                                    @change="onSpecialtiesChange"
                                    name="infectiousDisease"
                                    v-model="specialties"
                                    value="infectiousDisease"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="infectiousDisease"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.infectiousDisease'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="internalMedicine"
                                    @change="onSpecialtiesChange"
                                    name="internalMedicine"
                                    v-model="specialties"
                                    value="internalMedicine"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="internalMedicine"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.internalMedicine'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="nephrology"
                                    @change="onSpecialtiesChange"
                                    name="nephrology"
                                    v-model="specialties"
                                    value="nephrology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="nephrology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.nephrology')
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="neurology"
                                    @change="onSpecialtiesChange"
                                    name="neurology"
                                    v-model="specialties"
                                    value="neurology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="neurology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.neurology')
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="obstetricsGynecology"
                                    @change="onSpecialtiesChange"
                                    name="obstetricsGynecology"
                                    v-model="specialties"
                                    value="obstetricsGynecology"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="obstetricsGynecology"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t(
                                        'locale.onboardScreen.inputLabels.specialties.obstetricsGynecology'
                                      )
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="pediatrics"
                                    @change="onSpecialtiesChange"
                                    name="pediatrics"
                                    v-model="specialties"
                                    value="pediatrics"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="pediatrics"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.pediatrics')
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="psychiatry"
                                    @change="onSpecialtiesChange"
                                    name="psychiatry"
                                    v-model="specialties"
                                    value="psychiatry"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="psychiatry"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.psychiatry')
                                    }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="urgentCare"
                                    @change="onSpecialtiesChange"
                                    name="urgentCare"
                                    v-model="specialties"
                                    value="urgentCare"
                                    type="checkbox"
                                    class="matchmemd-checkbox"
                                  />
                                  <label
                                    for="urgentCare"
                                    class="ml-3 cursor-pointer block text-sm font-medium sm:font-normal leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{
                                      $t('locale.onboardScreen.inputLabels.specialties.urgentCare')
                                    }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div role="group" aria-labelledby="visa-required">
                        <div class="">
                          <div>
                            <div class="matchmemd-input-label" id="">
                              {{ $t('locale.onboardScreen.inputLabels.visa.title') }}
                            </div>
                          </div>
                          <div>
                            <div class="max-w-lg">
                              <div class="mt-2 space-y-4">
                                <div class="flex items-center">
                                  <input
                                    id="visa-yes"
                                    @change="onVisaChange"
                                    name="visa"
                                    v-model="visaRequired"
                                    :value="true"
                                    type="radio"
                                    class="matchmemd-radio"
                                  />
                                  <label
                                    for="visa-yes"
                                    :class="[
                                      visaRequired === 'yes' ? 'sm:font-medium' : 'sm:font-normal'
                                    ]"
                                    class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.visa.yes') }}
                                  </label>
                                </div>
                                <div class="flex items-center">
                                  <input
                                    id="visa-no"
                                    @change="onVisaChange"
                                    name="visa"
                                    v-model="visaRequired"
                                    :value="false"
                                    type="radio"
                                    class="matchmemd-radio"
                                  />
                                  <label
                                    for="visa-no"
                                    :class="[
                                      visaRequired === 'no' ? 'sm:font-medium' : 'sm:font-normal'
                                    ]"
                                    class="ml-3 cursor-pointer block text-sm font-medium leading-5 text-gray-600 sm:text-base"
                                  >
                                    {{ $t('locale.onboardScreen.inputLabels.visa.no') }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>

                <div class="py-6 flex flex-row space-x-4">
                  <button @click.prevent="back" class="matchmemd-button-negative w-full">
                    <div>{{ $t('locale.onboardScreen.backButton') }}</div>
                  </button>
                  <button @click.prevent="onFinishOnboarding" class="matchmemd-button w-full">
                    <div>{{ $t('locale.onboardScreen.finishButton') }}</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import throttle from 'lodash/throttle'
import CameraSVG from '@/components/CameraSVG.vue'
import MatchMeMDSelect from '@/components/MatchMeMDSelect.vue'
import MatchMeMDDatePicker from '@/components/MatchMeMDDatePicker.vue'
import OnboardingStepper from '@/components/OnboardingStepper.vue'
import {
  ONBOARDING_SKIP,
  ONBOARDING_BEGIN,
  ONBOARDING_NEXT,
  ONBOARDING_BACK,
  COUNTRY_SELECTED,
  BIRTHDAY_SELECTED,
  ONBOARDING_STEPPER_CHANGED,
  ONBOARDING_GENDER_CHANGE,
  ONBOARDING_MEDICAL_STATUS_CHANGE,
  ONBOARDING_CLINICAL_INTEREST_CHANGED,
  ONBOARDING_START_DATE_CHANGED,
  ONBOARDING_VISA_CHANGED,
  ONBOARDING_CLINICAL_CHANGED,
  ONBOARDING_SPECIALTIES_CHANGED,
  ONBOARDING_FINISHED,
  ONBOARDING_SPECIALTIES_SELECT_ALL,
  ONBOARDING_SPECIALTIES_REMOVE_ALL,
  ONBOARDING_UPLOADED_PROFILE_PICTURE
} from '../services/mixpanel-events'
import { Action } from '../store'
import { UserProfile } from '../types'
import { getUnixTime } from 'date-fns'
import { useI18n } from 'vue-i18n'
import { contactRequest } from '../services/api'
import ImageTools from '../services/ImageTools'

export default {
  name: 'Onboard',
  components: { CameraSVG, MatchMeMDSelect, MatchMeMDDatePicker, OnboardingStepper },
  setup() {
    mixpanel.track(ONBOARDING_BEGIN)
    const { t } = useI18n()

    const router = useRouter()
    const store = useStore<Partial<UserProfile>>()
    const userProfile: UserProfile = store.getters.getUserProfile
    const isPageTwo = ref(false)
    const profilePictureRef = ref()
    const school = ref(userProfile?.onboardData?.school)
    const country = ref(userProfile?.country)
    const previewedPhoto = ref({})
    const clinical = ref<string[]>(userProfile?.onboardData?.clinical || [])
    const specialties = ref<string[]>(userProfile?.onboardData?.specialties || [])
    const gender = ref<string | undefined>(userProfile?.gender)
    const visaRequired = ref<boolean | undefined>(userProfile?.onboardData?.visaRequired)
    const medicalStatus = ref<string | undefined>(userProfile?.onboardData?.medicalStatus)
    const hasClinicalInterest = ref<boolean>(userProfile?.onboardData?.hasClinicalInterest || false)
    const startDate = ref<string | undefined>(userProfile?.onboardData?.startDate)
    const initials = computed<string>(
      () => userProfile.firstName[0].toUpperCase() + userProfile.lastName[0].toUpperCase()
    )
    let date_of_birth: number | undefined = undefined
    document.title = t('locale.onboardScreen.meta.title')
    // load profile picture
    store.dispatch(Action.DOWNLOAD_PROFILE_PICTURE).then((data: string | null) => {
      if (typeof data === 'string') {
        previewedPhoto.value = { dataURL: data, file: { type: 'image' } }
      }
    })

    function updateUserProfile(payload: Partial<UserProfile>, event?: string, setPeople?: boolean) {
      store.dispatch(Action.UPDATE_USER_PROFILE, payload).then(() => {
        if (event) {
          mixpanel.track(event)
        }
        if (setPeople) {
          mixpanel.people.set(payload)
        }
      })
    }

    function previewFiles(event: Event) {
      const reader = new FileReader()
      const uploadedFile = (<EventTarget & { files: FileList }>event.target).files[0]
      reader.onload = () => {
        ImageTools.resize(
          uploadedFile,
          {
            width: 96,
            height: 96
          },
          function (blob: string | Partial<File>, didItResize: boolean) {
            previewedPhoto.value = didItResize
              ? { dataURL: window.URL.createObjectURL(blob), file: uploadedFile }
              : { dataURL: reader.result, file: uploadedFile }
            store.dispatch(Action.UPLOAD_PROFILE_PICTURE, blob || uploadedFile).then(() => {
              mixpanel.track(ONBOARDING_UPLOADED_PROFILE_PICTURE)
            })
          }
        )
      }
      if (uploadedFile) {
        reader.readAsDataURL(uploadedFile)
      }
    }

    function onCountryChange(country: string) {
      updateUserProfile({ country: country }, COUNTRY_SELECTED, true)
    }

    function onDateOfBirthChange(e: any) {
      date_of_birth = getUnixTime(new Date(e.value))
      store
        .dispatch(Action.UPDATE_USER_PROFILE, {
          dateOfBirth: getUnixTime(new Date(e.value))
        })
        .then(() => {
          mixpanel.track(BIRTHDAY_SELECTED)
          mixpanel.people.set({ 'Date of birth': new Date(e.value) })
        })
    }

    function nextPage() {
      mixpanel.track(ONBOARDING_NEXT)
      isPageTwo.value = true
    }

    function back() {
      mixpanel.track(ONBOARDING_BACK)
      isPageTwo.value = false
    }

    function onGenderChange() {
      updateUserProfile(
        {
          gender: gender.value
        },
        ONBOARDING_GENDER_CHANGE,
        true
      )
    }

    function onMedicalStatusChange() {
      updateUserProfile(
        {
          onboardData: { medicalStatus: medicalStatus.value }
        },
        ONBOARDING_MEDICAL_STATUS_CHANGE
      )
    }

    function onStepperChange(value: boolean) {
      mixpanel.track(ONBOARDING_STEPPER_CHANGED, value)
      isPageTwo.value = value
    }

    function onStartDateChange() {
      updateUserProfile(
        {
          onboardData: { startDate: startDate.value }
        },
        ONBOARDING_START_DATE_CHANGED
      )
    }

    function onHasClinicalInterestChange() {
      updateUserProfile(
        {
          onboardData: { hasClinicalInterest: hasClinicalInterest.value }
        },
        ONBOARDING_CLINICAL_INTEREST_CHANGED
      )
    }

    const onClinicalChange = throttle(
      () => {
        updateUserProfile(
          {
            onboardData: { clinical: clinical.value }
          },
          ONBOARDING_CLINICAL_CHANGED
        )
      },
      3000,
      { leading: false }
    )

    function onVisaChange() {
      updateUserProfile(
        {
          onboardData: { visaRequired: visaRequired.value }
        },
        ONBOARDING_VISA_CHANGED
      )
    }

    const onSchoolChange = throttle(
      () => {
        updateUserProfile({ onboardData: { school: school.value } })
      },
      3000,
      { leading: false }
    )

    function onSpecialtiesAction(action: string) {
      if (action === 'add') {
        mixpanel.track(ONBOARDING_SPECIALTIES_SELECT_ALL)
        specialties.value = [
          'anesthesiology',
          'cardiology',
          'dermatology',
          'emergencyMedicine',
          'endocrinology',
          'familyMedicine',
          'gastroenterology',
          'geriatricMedicine',
          'hematologyOncology',
          'infectiousDisease',
          'internalMedicine',
          'nephrology',
          'neurology',
          'obstetricsGynecology',
          'pediatrics',
          'psychiatry',
          'urgentCare'
        ]
      } else if (action === 'remove') {
        mixpanel.track(ONBOARDING_SPECIALTIES_REMOVE_ALL)
        specialties.value = []
      }
      onSpecialtiesChange()
    }

    const onSpecialtiesChange = throttle(
      () => {
        updateUserProfile(
          { onboardData: { specialties: specialties.value } },
          ONBOARDING_SPECIALTIES_CHANGED
        )
      },
      3000,
      { leading: false }
    )

    function onFinishOnboarding(skipped: boolean) {
      store
        .dispatch(Action.UPDATE_USER_PROFILE, {
          registrationComplete: true
        })
        .then(() => {
          if (skipped) {
            mixpanel.track(ONBOARDING_SKIP)
          } else {
            mixpanel.track(ONBOARDING_FINISHED)
          }
          // # Gender              string `json:"e13_T"`
          // # DateOfBirth         int    `json:"e14_N"`
          // # MedicalStatus       string `json:"e15_T"`
          // # Specialties         string `json:"e9_T"`
          // # HasClinicalInterest string `json:"e16_T"`
          // # Clinicals           string `json:"e10_T"`
          // # VisaRequired        string `json:"e12_T"`
          // # School              string `json:"e5_T"`
          // # StartDate           string `json:"e11_T"`
          contactRequest({
            email: userProfile.email,
            country: country.value || userProfile.country,
            first_name: userProfile.firstName,
            last_name: userProfile.lastName,
            custom_fields: {
              e10_T: clinical.value.join(','),
              e16_T: hasClinicalInterest.value.toString(),
              e14_N: date_of_birth || userProfile.dateOfBirth,
              e12_T: visaRequired.value?.toString(),
              e13_T: gender.value,
              e9_T: specialties.value.join(','),
              e15_T: medicalStatus.value,
              e11_T: startDate.value,
              e5_T: school.value
            }
          })

          router.push('/dashboard')
        })
    }

    return {
      initials,
      previewFiles,
      previewedPhoto,
      userProfile,
      profilePictureRef,
      onCountryChange,
      onDateOfBirthChange,
      nextPage,
      gender,
      isPageTwo,
      back,
      onGenderChange,
      onStepperChange,
      school,
      onSchoolChange,
      onMedicalStatusChange,
      medicalStatus,
      hasClinicalInterest,
      onHasClinicalInterestChange,
      startDate,
      onStartDateChange,
      clinical,
      onClinicalChange,
      visaRequired,
      onVisaChange,
      specialties,
      onSpecialtiesChange,
      onSpecialtiesAction,
      onFinishOnboarding,
      country
    }
  }
}
</script>

<style scoped>
/* START CUSTOM SCROLLBAR */
/* width */
::-webkit-scrollbar {
  width: 0.15rem;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey;
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #108c9f;
  border-radius: 1rem;
  height: 1rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #15555f;
}
/* END CUSTOM SCROLLBAR */
</style>
