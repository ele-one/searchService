var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var ListServices = require('../../client/src/components/ListServices.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    // var root = ReactTestUtils.renderIntoDocument(<List />);
    var root = ReactTestUtils.isCompositeComponent(ListServices, <ListServices />)
    expect(root).to.exist;
  });
});


