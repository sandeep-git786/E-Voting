/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dto;

import java.io.InputStream;

/**
 *
 * @author sandeep
 */
public class CandidateDetails {
    private String candidateId;
    private String party;
    private String city;
    private String userId;
    private String symbol;
    private String candidateName;

    @Override
    public String toString() {
        return "CadidateDetails{" + "candidateId=" + candidateId + ", party=" + party + ", city=" + city + ", userId=" + userId + ", symbol=" + symbol + ", candidateName=" + candidateName + '}';
    }

    public CandidateDetails(String candidateId, String party, String city, String userId, String symbol, String candidateName) {
        this.candidateId = candidateId;
        this.party = party;
        this.city = city;
        this.userId = userId;
        this.symbol = symbol;
        this.candidateName = candidateName;
    }

    public CandidateDetails() {
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }
    
}
