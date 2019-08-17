package kotlin_.system_practise

/**
 * Created by wislie on 2019/1/29.
 */
class Animal {
    init {
        println("会飞的animal")
    }
}

class Pet(val size: Int = 17, name: String) {

    init {
        println("size:" + size + " name:" + name)
    }

    constructor(size: Int = 2, name: String, wherea: String = "northEast") : this(size, name) {
        var result = if (size < 15) "小动物" else "成年动物"
        println("size:" + result + " name:" + name + " wherea:" + wherea)
    }
}

fun main(args: Array<String>) {
    var animal = Animal()

    var pet1 = Pet(15, "tiger");
    var pet2 = Pet(10, "pig", "southChina");

    println("pet1尺寸:" + pet1.size+" pet2尺寸:"+pet2.size)
}