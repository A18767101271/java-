package kotlin_.system_practise

/**
 * Created by wislie on 2019/1/29.
 */
class AnimalMember(var name: String, sex: Int = 0) {
    var sexName = ""

    init {
        sexName = if (sex == 0) "公" else "母"
    }
}

fun main(args: Array<String>) {
    var animalMember1 = AnimalMember("sheep")
    println("${animalMember1.name}的性别是${animalMember1.sexName}")

    var animalMember2 = AnimalMember("dog", 1)
    println("${animalMember2.name}的性别是${animalMember2.sexName}")
}