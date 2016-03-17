/**
 * Created by m3days on 13.03.16.
 */
describe("isNumeric", function() {

    describe("Возвращает true если аргумент число", function() {
         function maketest(x) {
            it("Все аргументы являются числами", function() {
                assert(isNumeric(x));
            });
         }

        for (var i = -5; i <= 5; i++ ) {
            maketest(i);
        }
    });

    it("Проверка ввода нечислового значения", function() {
        assert.equal(isNumeric("abc"), false);
    });
});

describe("compareNumb вычитает второй аргумент из первого", function(){
    it("5-3=2", function() {
        assert.equal(compareNumb(5, 3), 2);
    });

    it("-3-(-5)=2", function() {
        assert.equal(compareNumb(-3, -5), 2);
    });
});