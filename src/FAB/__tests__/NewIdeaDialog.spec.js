/* eslint-env mocha, jest */

import getActualComponentFactory from '../../lib/testUtils';
import NewIdeaDialog from '../NewIdeaDialog';

const defaultProps = {
  open: false,
  onRequestClose() {},
  onRequestAdd() {},
};
const getActualDialog = getActualComponentFactory(NewIdeaDialog, defaultProps);

it('should render', () => {
  getActualDialog();
});
it('should be a Dialog', () => {
  const wrapper = getActualDialog();
  expect(wrapper.is('Dialog')).toBe(true);
});
it('should have 1 Dialog', () => {
  const wrapper = getActualDialog();
  expect(wrapper.find('Dialog').length).toBe(1);
});

it('should call onRequestClose inside cancel FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[2].props.onClick();
});
it('should call onRequestClose inside finish FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestClose() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onClick();
});
it('should call onRequestAdd inside add FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestAdd() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[1].props.onClick();
});
it('should call onRequestAdd inside finish FlatButton onClick', (done) => {
  const wrapper = getActualDialog({
    onRequestAdd() {
      done();
    },
  });
  wrapper.find('Dialog').prop('actions')[0].props.onClick();
});

it('should set FlatButton disabled based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool idea' } });
  wrapper.update();
  expect(wrapper.find('Dialog').prop('actions')[0].props.disabled).toBe(false);
  expect(wrapper.find('Dialog').prop('actions')[1].props.disabled).toBe(false);
});
it('should set TextField value based on state', () => {
  const wrapper = getActualDialog();
  wrapper.find('TextField').props().onChange({ target: { value: 'a cool idea' } });
  wrapper.update();
  expect(wrapper.find('TextField').prop('value')).toBe('a cool idea');
});
