import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Navbar from '../src/components/Navbar.vue';

// Mock Vue Router
const $route = { path: '/info' };
const $router = { push: () => {} };

describe('Navbar.vue', () => {
  it('renderiza el texto SIAC', () => {
    const wrapper = mount(Navbar, {
      global: {
        mocks: {
          $route,
          $router,
        },
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          'router-view': true,
        },
      },
    });
    expect(wrapper.text()).toContain('SIAC');
  });
});
