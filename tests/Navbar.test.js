import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Navbar from '../src/components/Navbar.vue';

describe('Navbar.vue', () => {
  it('renderiza el texto SIAC', () => {
    const wrapper = mount(Navbar);
    expect(wrapper.text()).toContain('SIAC');
  });
});
