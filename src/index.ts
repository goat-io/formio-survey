import Formio from "formiojs/Formio";
import { Event } from "./EventEmitter";
import './style.css'

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node =
      typeof element === "string" ? document.querySelector(element) : element;

    if (!node) {
      return resolve("Animation ended");
    }

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      return resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

export default (() => {
  const initializeForm = ({
    form,
    src,
    renderElement,
    options,
    animations,
  }: {
    form?: { [key: string]: any };
    src?: string;
    renderElement: any;
    options: any;
    animations: {
      click: string;
      next: string;
      previous: string;
    };
  }): Promise<Formio> => {
    return new Promise((resolve, reject) => {
      if (src) {
        const f = Formio.createForm(renderElement, src || form, {
          hooks: {
            beforeNext: (currentPage, submission, next) => {
              if(currentPage.path === 'page42') {
                
                f.then((form: Formio): Formio => {
                  void form.submit()
                })
                
              }
              animateCSS(
                ".formio-form div",
                animations.next || "bounceOutLeft"
              ).then(() => {
                next();
              });
            },
            beforePrev: (currentPage, submission, next) => {
              animateCSS(
                ".formio-form div",
                animations.previous || "bounceOutRight"
              ).then(() => {
                next();
              });
            },
          },
          ...options,
        });
        resolve(
          f
            .then((form: Formio): Formio => {
              return form;
            })
            .catch((err: Error) => {
              return reject(err);
            })
        );
      } else {
        return reject("Must set src or form attribute");
      }
    });
  };

  const render = async ({
    baseUrl,
    form,
    src,
    renderElement,
    plugin,
    instanceId,
    options,
    language,
    animations,
  }: {
    baseUrl: string;
    form: { [key: string]: any };
    src?: string;
    renderElement: any;
    plugin: any;
    instanceId: string;
    options: any;
    submission: any;
    language: string;
    animations: {
      click: string;
      next: string;
      previous: string;
    };
  }) => {
    if (baseUrl) {
      Formio.setBaseUrl(baseUrl);
    }

    if (plugin) {
      Formio.registerPlugin(plugin, `formioPlugin_${instanceId}`);
    }

    const FormioInstance = await initializeForm({
      form,
      src,
      renderElement,
      options,
      animations,
    });

    // FormioInstance.submission = submission;
    FormioInstance.url = baseUrl;
    FormioInstance.language = language || "en";

    FormioInstance.events.onAny((...args: [event: string, ...args: any]) => {
      const eventParts = args[0].split(".");

      // Only handle formio events.
      if (eventParts[0] !== "formio" || eventParts.length !== 2) {
        return;
      }

      const e = {
        name: args[0],
        data: {
          ...args[1],
        },
        text: args[0],
      };

      if (e.name === "formio.change") {
        if (e?.data?.changed) {
          animateCSS(
            `#${e.data.changed.instance.id}`,
            animations.click || "tada"
          );
        }
      }
      // Emit custom events under their own name as well.
      if (eventParts[1] === "customEvent") {
        args[0] = args[1].type;
      }

      Event.emit(args[0], {
        data: {
          ...args[1],
        },
        text: args[0],
      });
    });
  };
  return Object.freeze({ render });
})();
