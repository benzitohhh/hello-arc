var React    = require('react'),
    ReactDOM = require('react-dom')
;

var RADIUS = 60;
var VALUE = 0.8;

function get_height(k, r) {
  var t0, t1 = k * 2 * Math.PI;

  // Solve for theta numerically.
  if (k > 0 && k < 1) {
    t1 = Math.pow(12 * k * Math.PI, 1 / 3);
    for (var i = 0; i < 10; ++i) {
      t0 = t1;
      t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
    }
    k = (1 - Math.cos(t1 / 2)) / 2;
  }

  var h = 2 * r * k;
  return h;
}

var Pipe = React.createClass({
  render: function() {

    var height = get_height(VALUE, RADIUS);
    var x = Math.sqrt(Math.pow(RADIUS, 2) - Math.pow(height - RADIUS, 2));

    var x1 = -x;
    var x2 = x;
    var y = RADIUS - height;
    var large_arc = VALUE > 0.5 ? 1 : 0;

    return (
      <svg>
        <g transform={'translate(' + RADIUS + ',' + RADIUS + ')'}>
          <circle r={RADIUS} fill="yellow"/>

          {VALUE >= 1 &&
            <circle r={RADIUS} fill="green"/>
          }

          {VALUE < 1 &&
            <path
              d={"M " + x1 + " " + y + " A " + RADIUS + " " + RADIUS + " 1 " + large_arc + " 0 " + x2 + " " + y}
              stroke="none"
              fill="green"
            />
          }

          <circle r={RADIUS} fill="none" stroke="black" stroke-width="1.5"/>
        </g>
      </svg>
    );
  }
});

ReactDOM.render(
  <Pipe />,
  document.getElementById('container')
);
