import React, {Component} from "react"
import Typed from "typed.js"

class TypedString extends Component {
    componentDidMount() {
      const { strings } = this.props;
      const options = {
          strings: strings,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 5000,
            smartBackspace:true,
            loop:true
      };
      this.typed = new Typed(this.el, options);
    }
  
    componentWillUnmount() {
      this.typed.destroy();
    }
    render () {
        return (
            <div>
                <span
                  ref={(el) => { this.el = el; }}
          />
            </div>
        )
    }
}
export default TypedString