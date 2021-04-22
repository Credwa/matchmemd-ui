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
          {{ $t('locale.termsScreen.header') }}
          <a class="text-pacific-600 hover:text-pacific-700" href="https://matchmemd.com"
            >https://matchmemd.com</a
          >
        </h1>
      </header>
      <div class="space-y-9 max-w-7xl pb-24">
        <p class="text-base font-normal">
          {{ $t('locale.termsScreen.paragraphOne') }}
        </p>

        <p class="text-base font-normal">
          {{ $t('locale.termsScreen.paragraphTwo') }}
        </p>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.cookies') }}
          </h3>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphThree.one') }}
            <router-link class="text-pacific-600 hover:text-pacific-700" to="/policy"
              >Privacy Policy.</router-link
            >
            {{ $t('locale.termsScreen.paragraphThree.two') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">{{ $t('locale.termsScreen.license') }}</h3>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphFour') }}
          </p>

          <p class="text-base font-normal">{{ $t('locale.termsScreen.paragraphFive.one') }}</p>
          <ul class="list-disc pl-8">
            <li>{{ $t('locale.termsScreen.paragraphFive.two') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphFive.three') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphFive.four') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphFive.five') }}</li>
          </ul>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphSix') }}
            <a href="https://www.termsandconditionsgenerator.com">Terms And Conditions Generator</a>
            {{ $t('locale.termsScreen.andThe') }}
            <a href="https://www.generateprivacypolicy.com">Privacy Policy Generator</a>.
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphSeven') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEight') }}
          </p>

          <p class="text-base font-normal">{{ $t('locale.termsScreen.paragraphNine.one') }}</p>

          <ul class="list-disc pl-8">
            <li>
              {{ $t('locale.termsScreen.paragraphNine.two') }}
            </li>
            <li>
              {{ $t('locale.termsScreen.paragraphNine.three') }}
            </li>
            <li>
              {{ $t('locale.termsScreen.paragraphNine.four') }}
            </li>
            <li>
              {{ $t('locale.termsScreen.paragraphNine.five') }}
            </li>
          </ul>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphTen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.hyperlinking') }}
          </h3>
          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.one') }}
          </p>

          <ul class="list-disc pl-8">
            <li>{{ $t('locale.termsScreen.paragraphEleven.two') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.three') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.four') }}</li>
            <li>
              {{ $t('locale.termsScreen.paragraphEleven.five') }}
            </li>
            <li>
              {{ $t('locale.termsScreen.paragraphEleven.six') }}
            </li>
          </ul>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.seven') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.eight') }}
          </p>

          <ul class="list-disc pl-8">
            <li>{{ $t('locale.termsScreen.paragraphEleven.nine') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.ten') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.eleven') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.twelve') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.thirteen') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.fourteen') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.fifteen') }}</li>
          </ul>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.sixteen') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.seventeen') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.eighteen') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.nineteen') }}
          </p>

          <ul class="list-disc pl-8">
            <li>{{ $t('locale.termsScreen.paragraphEleven.twenty') }}</li>
            <li>{{ $t('locale.termsScreen.paragraphEleven.twentyOne') }}</li>
            <li>
              {{ $t('locale.termsScreen.paragraphEleven.twentyTwo') }}
            </li>
          </ul>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphEleven.twentyThree') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">{{ $t('locale.termsScreen.iframes') }}</h3>
          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphTwelve') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.contentLiability') }}
          </h3>
          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphThirteen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.yourPrivacy') }}
          </h3>
          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphFourteen') }}
            <router-link class="text-pacific-600 hover:text-pacific-700" to="/policy"
              >Privacy Policy</router-link
            >
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.rights') }}
          </h3>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphFifteen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.removal') }}
          </h3>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphSixteen') }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium sm:text-2xl">
            {{ $t('locale.termsScreen.disclaimer') }}
          </h3>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphSeventeen.one') }}
          </p>

          <ul class="list-disc pl-8">
            <li>{{ $t('locale.termsScreen.paragraphSeventeen.two') }}</li>
            <li>
              {{ $t('locale.termsScreen.paragraphSeventeen.three') }}
            </li>
            <li>
              {{ $t('locale.termsScreen.paragraphSeventeen.four') }}
            </li>
            <li>
              {{ $t('locale.termsScreen.paragraphSeventeen.five') }}
            </li>
          </ul>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphSeventeen.six') }}
          </p>

          <p class="text-base font-normal">
            {{ $t('locale.termsScreen.paragraphSeventeen.seven') }}
          </p>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
