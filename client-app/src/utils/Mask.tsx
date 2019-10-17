import VMasker from 'vanilla-masker'

export default class Mask {

    static maskDinamicyHandler(masks: Array<string>, max: number, event: { target: any; }) {
        console.log("aqui");        
        var c = event.target;
        var v = c.value.replace(/\D/g, '');
        var m = v.length > max ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(masks[m]);
        c.value = VMasker.toPattern(v, masks[m]);
    }

    static maskStaticHandler(masks: string, event: { target: any; }) {
        var c = event.target;
        var v = c.value.replace(/\D/g, '');        
        VMasker(c).unMask();
        VMasker(c).maskPattern(masks);
        c.value = VMasker.toPattern(v, masks);
    }

    static setMaskTel(id: string): void {
        const arrayMask = ["(99)9999-9999", "(99)99999-9999"]
        const el = document.getElementById(id) as HTMLInputElement
        VMasker(el).maskPattern(arrayMask[el.value.length > 10 ? 1 : 0])
        el.addEventListener('input', this.maskDinamicyHandler.bind(undefined, arrayMask, 10), false);
        // el.addEventListener('blur', this.maskDinamicyHandler.bind(undefined, arrayMask, 10), false);
    }
    
    static setMaskPostalCode(id: string): void {
        const mask = "99999-999"
        const elPostal = document.getElementById(id) as HTMLInputElement
        VMasker(elPostal).maskPattern(mask)
        elPostal.addEventListener('input', this.maskStaticHandler.bind(undefined, mask), false);
        // elPostal.addEventListener('blur', this.maskStaticHandler.bind(undefined, mask), false);
    }
}