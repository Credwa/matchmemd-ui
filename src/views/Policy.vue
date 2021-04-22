<template>
  <LayoutDefault>
    <div class="px-6 py-12 space-y-8 sm:space-y-12">
      <header class="sm:mx-auto sm:w-full flex-col content-center text-center">
        <router-link to="/login">
          <img
            height="40"
            width="210"
            class="mx-auto h-9 sm:h-10 w-auto"
            src="/logo.svg"
            alt="MatchMeMD"
        /></router-link>
        <h1
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 text-gray-900"
        >
          {{ $t('locale.policyScreen.header') }}
          <a class="text-pacific-600 hover:text-pacific-700" href="https://matchmemd.com"
            >https://matchmemd.com</a
          >
        </h1>
      </header>
      <div class="space-y-9 max-w-7xl pb-24">
        <p class="text-base font-normal">
          {{ $t('locale.policyScreen.at') }}
          <a href="https://matchmemd.com" class="text-pacific-600 hover:text-pacific-600"
            >MatchMeMD</a
          >{{ $t('locale.policyScreen.paragraphOne') }}
        </p>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.policyScreen.dataCollected') }}
          </h3>

          <p class="text-base font-normal">
            {{ $t('locale.policyScreen.paragraphTwo') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.policyScreen.paragraphThree') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.policyScreen.paragraphFour') }}
            <a
              class="text-pacific-600 hover:text-pacific-700"
              href="https://www.privacy-policy-template.com"
              >Privacy Policy Template</a
            >
            {{ $t('locale.policyScreen.andThe') }}
            <a
              class="text-pacific-600 hover:text-pacific-700"
              href="https://www.generateprivacypolicy.com"
              >Generate Privacy Policy Generator</a
            >.
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">{{ $t('locale.policyScreen.useOfData') }}</h3>

          <p>
            {{ $t('locale.policyScreen.paragraphFive.one') }}
            <a href="https://matchmemd.com" class="text-pacific-600 hover:text-pacific-600"
              >MatchMeMD</a
            >
            {{ $t('locale.policyScreen.paragraphFive.two') }}
          </p>

          <p>
            {{ $t('locale.policyScreen.paragraphSix') }}
          </p>

          <p>
            {{ $t('locale.policyScreen.paragraphSeven') }}
          </p>

          <ul class="list-disc pl-8">
            <li>{{ $t('locale.policyScreen.paragraphEight') }}</li>
            <li>
              {{ $t('locale.policyScreen.paragraphNine') }}
            </li>
            <li>
              {{ $t('locale.policyScreen.paragraphTen') }}
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.policyScreen.sharingOfData') }}
          </h3>

          <p>
            {{ $t('locale.policyScreen.paragraphEleven') }}
          </p>

          <p>
            {{ $t('locale.policyScreen.paragraphTwelve') }}
          </p>

          <p>
            {{ $t('locale.policyScreen.paragraphThirteen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">{{ $t('locale.policyScreen.cookies') }}</h3>

          <p>{{ $t('locale.policyScreen.paragraphFourteen') }}</p>

          <p>
            {{ $t('locale.policyScreen.paragraphFifteen.one') }}
            <a href="https://www.privacypolicyonline.com/what-are-cookies/">{{
              $t('locale.policyScreen.paragraphFifteen.two')
            }}</a
            >.
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">{{ $t('locale.policyScreen.optOut') }}</h3>

          <p>
            {{ $t('locale.policyScreen.paragraphSixteen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">{{ $t('locale.policyScreen.security') }}</h3>

          <p>
            {{ $t('locale.policyScreen.paragraphSeventeen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.policyScreen.terms') }}
          </h3>

          <p>
            {{ $t('locale.policyScreen.pleaseRead') }}

            <router-link class="text-pacific-600 hover:text-pacific-600" to="/terms"
              >Terms and Conditions</router-link
            >
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.policyScreen.aboutChildren') }}
          </h3>

          <p>
            {{ $t('locale.policyScreen.paragraphEighteen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.policyScreen.policyChanges') }}
          </h3>

          <p>
            {{ $t('locale.policyScreen.paragraphNineteen') }}
          </p>

          <p>
            {{ $t('locale.policyScreen.paragraphTwenty') }}
          </p>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
