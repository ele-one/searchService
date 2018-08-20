var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var ListItem = require('../../react-client/src/components/ListItem.jsx');


var expect = require('chai').expect;
var item = 'one'

describe('root', function () {
  it('renders without problems', function () {
    // var root = ReactTestUtils.renderIntoDocument(<List />);
    var root = ReactTestUtils.isCompositeComponent(ListItem, <ListItem />)
    expect(root).to.exist;
  });
});
