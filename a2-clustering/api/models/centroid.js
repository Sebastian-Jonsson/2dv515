class Centroid {

    constructor() {
       this.assignments = []
       this.previousAssignments = []
       this.word_count = []
    }

    set_word_count(i, item) {
        this.word_count[i] = item
    }

    set_assignment(item) {
        this.assignments.push(item)
    }

    clear_assignments() {
        this.previousAssignments = []
        this.previousAssignments = [...this.assignments]
        this.assignments = []
    }

    compare_assignments() {
        if (this.same_length()) {
            for (let i = 0; i < this.assignments.length; i++) {
                if (this.assignments[i].blogName !== this.previousAssignments[i].blogName) {
                    return false
                }
            //     else {
            //     }
            }   
            return true
        }
    }

    same_length() {
        return this.assignments.length === this.previousAssignments.length
    }

}


module.exports = Centroid