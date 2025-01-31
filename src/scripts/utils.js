function createElement(element, attributes, children) {
    function isDOMElement(value) {
    return value instanceof Element;
 };

function isValidAttribute(key) {
    const testElement = document.createElement('div');
    return testElement.setAttribute(key, '') !== false;
        
 };
    
if (!element) {
    throw new Error("The element is not provided");
}
    const elem = document.createElement(element);

 if (!isDOMElement(elem)) {
    throw new Error("The element provided is not a valid DOM element");
}

if (attributes) {
     for (const [name, value] of Object.entries(attributes)) {
        if (isValidAttribute(name,value)) {
             elem.setAttribute(name, value);
        }
    }
}

 if (Array.isArray(children)) {
     children.forEach(child => {
        if(typeof child === 'string') {
            elem.appendChild(document.createTextNode(child));
        } else {  
             elem.appendChild(child);
        }
    });
        } else if (typeof children === 'string') {
            elem.appendChild(document.createTextNode(children));
        }else if(isDOMElement(children)){
            elem.appendChild(children);
        }

        return elem;
    };
    
        function render(element, target){
        if (!element) {
        throw new Error("The element is not provided");
        }
        if (!target) {
        throw new Error("The target is not provided");
        }
        target.appendChild(element);
        }

        export default {
            createElement,
            render   
        };

          