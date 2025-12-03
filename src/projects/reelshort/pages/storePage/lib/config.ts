import { getEnv } from '@/utils/utils'
const config = {
  dev: {
    stripe_pk:
      'pk_test_51OMnlGBfSY9Ko4G166TKllUMmasJOtXmccdbJuKtz2QPkQZvHksBno8fq5jmKzDIajWDFIgsI2Pei3HRxaAoeDgE00otQ2giFf'
  },
  test: {
    stripe_pk:
      'pk_test_51OMnlGBfSY9Ko4G166TKllUMmasJOtXmccdbJuKtz2QPkQZvHksBno8fq5jmKzDIajWDFIgsI2Pei3HRxaAoeDgE00otQ2giFf'
  },
  gray: {
    stripe_pk:
      'pk_test_51OMnlGBfSY9Ko4G166TKllUMmasJOtXmccdbJuKtz2QPkQZvHksBno8fq5jmKzDIajWDFIgsI2Pei3HRxaAoeDgE00otQ2giFf'
  },
  prod: {
    stripe_pk:
      'pk_live_51OMnlGBfSY9Ko4G14rycCIrY3Rf8jjpKLD61SjylZw7uV3NYcwjRck7lrRoz6hCVmsIB8LV0OYtqmcK6TE7WrjPj00NJt6fDZ8'
  }
}
export default config[getEnv()]
