package kotlin_.system_practise

import java.util.*

/**
 * Created by wislie on 2019/1/29.
 */
class WildAnimalCompanion(var name: String, val sex: Int = 0) {

    var sexName = ""

    init {
        sexName = if (sex == 0) "公" else "母"
    }

    companion object WildAnimal {
        fun judgeSex(sexName: String): Int {

            var sex = when (sexName) {
                "雄", "公" -> 1
                "母", "雌" -> -1
                else -> 0
            }
            return sex
        }
    }
}

fun main(args: Array<String>) {

    var sexArray = arrayOf("雄", "公", "母", "雌")
    var rd = Random()
    var index = rd.nextInt(sexArray.size)
    println("随机生成的动物性别是${WildAnimalCompanion.judgeSex(sexArray[index])}")
}